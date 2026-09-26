import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

import User from "./models/User.mjs";
import Target from "./models/Target.mjs";
import Resume from "./models/Resume.mjs";
import Application from "./models/Application.mjs";
import { CAREER_PORTALS, generatePortalJobs } from "./data/careerData.mjs";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 3000;

const JWT_SECRET =
  process.env.JWT_SECRET || "skillgap_secret";


// ======================================================
// BASIC MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ======================================================
// UPLOAD FOLDER
// ======================================================

const uploadDirectory = path.join(
  process.cwd(),
  "src",
  "uploads"
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

app.use(
  "/uploads",
  express.static(uploadDirectory)
);


// ======================================================
// MULTER
// ======================================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },

  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);

    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 100000) +
      extension;

    cb(null, filename);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      ".pdf",
      ".doc",
      ".docx",
    ];

    const extension =
      path.extname(file.originalname).toLowerCase();

    if (!allowedTypes.includes(extension)) {
      return cb(
        new Error(
          "Only PDF, DOC and DOCX files are allowed."
        )
      );
    }

    cb(null, true);
  },
});


// ======================================================
// DATABASE
// ======================================================

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
}


// ======================================================
// AUTH MIDDLEWARE
// ======================================================

function authenticate(req, res, next) {
  try {
    const authorization =
      req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const token =
      authorization.startsWith("Bearer ")
        ? authorization.split(" ")[1]
        : authorization;

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}


// ======================================================
// LEVEL HELPER
// ======================================================

function levelValue(level) {
  if (level === "Beginner") {
    return 1;
  }

  if (level === "Intermediate") {
    return 2;
  }

  if (level === "Advanced") {
    return 3;
  }

  return 0;
}


// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SkillGap backend is running.",
  });
});


app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SkillGap API is working.",
  });
});


// ======================================================
// REGISTER
// ======================================================

app.post("/api/auth/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      college,
      course,
      year,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters.",
      });
    }

    const existingUser =
      await User.findOne({
        email: email.toLowerCase(),
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,

      college: college || "",
      course: course || "",
      year: year || "",

      // IMPORTANT:
      // New user starts with empty data.
      selectedTarget: null,
      skills: [],
      dsaProgress: [],
      interviewProgress: [],
      roadmap: [],
      resumeUploaded: false,
      resumeId: null,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        course: user.course,
        year: user.year,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
});


// ======================================================
// LOGIN
// ======================================================

app.post("/api/auth/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });
    }

    const user =
      await User.findOne({
        email: email.toLowerCase(),
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const passwordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Login successful.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        course: user.course,
        year: user.year,

        selectedTarget:
          user.selectedTarget,

        resumeUploaded:
          user.resumeUploaded,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});


// ======================================================
// CURRENT USER
// ======================================================

app.get(
  "/api/auth/me",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(req.userId)
          .select("-password")
          .populate("selectedTarget")
          .populate("resumeId");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not retrieve user.",
      });
    }
  }
);


// ======================================================
// PROFILE
// ======================================================

app.get(
  "/api/profile",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(req.userId)
          .select("-password")
          .populate("selectedTarget");

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not load profile.",
      });
    }
  }
);


app.put(
  "/api/profile",
  authenticate,
  async (req, res) => {
    try {
      const {
        name,
        college,
        course,
        year,
      } = req.body;

      const user =
        await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      if (name !== undefined) {
        user.name = name;
      }

      if (college !== undefined) {
        user.college = college;
      }

      if (course !== undefined) {
        user.course = course;
      }

      if (year !== undefined) {
        user.year = year;
      }

      await user.save();

      res.json({
        success: true,
        message: "Profile updated.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          college: user.college,
          course: user.course,
          year: user.year,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not update profile.",
      });
    }
  }
);


// ======================================================
// TARGETS
// ======================================================

app.get(
  "/api/targets",
  async (req, res) => {
    try {
      const targets =
        await Target.find().sort({
          type: 1,
          name: 1,
        });

      res.json({
        success: true,
        targets,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not load targets.",
      });
    }
  }
);


// ======================================================
// GET SINGLE TARGET
// ======================================================

app.get(
  "/api/targets/:id",
  async (req, res) => {
    try {
      const target =
        await Target.findById(
          req.params.id
        );

      if (!target) {
        return res.status(404).json({
          success: false,
          message: "Target not found.",
        });
      }

      res.json({
        success: true,
        target,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not load target.",
      });
    }
  }
);


// ======================================================
// SELECT TARGET
// ======================================================

app.post(
  "/api/user-target",
  authenticate,
  async (req, res) => {
    try {
      const {
        targetId,
      } = req.body;

      if (!targetId) {
        return res.status(400).json({
          success: false,
          message:
            "Target ID is required.",
        });
      }

      const target =
        await Target.findById(
          targetId
        );

      if (!target) {
        return res.status(404).json({
          success: false,
          message: "Target not found.",
        });
      }

      const user =
        await User.findById(
          req.userId
        );

      user.selectedTarget =
        target._id;

      await user.save();

      res.json({
        success: true,
        message:
          "Target selected successfully.",
        target,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not select target.",
      });
    }
  }
);


// ======================================================
// GET USER TARGET
// ======================================================

app.get(
  "/api/user-target",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.userId
        ).populate(
          "selectedTarget"
        );

      res.json({
        success: true,
        target:
          user.selectedTarget || null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not load selected target.",
      });
    }
  }
);


// ======================================================
// SKILLS
// ======================================================

app.get(
  "/api/skills",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.userId
        );

      res.json({
        success: true,
        skills: user.skills,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not load skills.",
      });
    }
  }
);


// ======================================================
// SAVE ALL SKILLS
// ======================================================

app.post(
  "/api/skills",
  authenticate,
  async (req, res) => {
    try {
      const { skills } = req.body;

      if (!Array.isArray(skills)) {
        return res.status(400).json({
          success: false,
          message:
            "Skills must be an array.",
        });
      }

      const validLevels = [
        "Beginner",
        "Intermediate",
        "Advanced",
      ];

      for (const skill of skills) {
        if (
          !skill.name ||
          !validLevels.includes(
            skill.level
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Each skill must have a valid name and level.",
          });
        }
      }

      const user =
        await User.findById(
          req.userId
        );

      user.skills = skills;

      await user.save();

      res.json({
        success: true,
        message:
          "Skills saved successfully.",
        skills: user.skills,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not save skills.",
      });
    }
  }
);


// ======================================================
// SKILL GAP
// ======================================================

app.get(
  "/api/skill-gap",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.userId
        ).populate(
          "selectedTarget"
        );

      if (!user.selectedTarget) {
        return res.status(400).json({
          success: false,
          message:
            "Please select a target first.",
        });
      }

      const target =
        user.selectedTarget;

      const currentSkills =
        user.skills || [];

      const gaps =
        target.requirements.map(
          (requirement) => {
            const current =
              currentSkills.find(
                (skill) =>
                  skill.name.toLowerCase() ===
                  requirement.skill.toLowerCase()
              );

            const currentLevel =
              current?.level ||
              "Beginner";

            const requiredValue =
              levelValue(
                requirement.requiredLevel
              );

            const currentValue =
              levelValue(
                currentLevel
              );

            const gap =
              requiredValue -
              currentValue;

            let status = "GOOD";

            if (gap >= 2) {
              status = "HIGH";
            } else if (gap === 1) {
              status = "MEDIUM";
            }

            return {
              skill:
                requirement.skill,

              requiredLevel:
                requirement.requiredLevel,

              currentLevel,

              gap,

              status,
            };
          }
        );

      gaps.sort(
        (a, b) =>
          b.gap - a.gap
      );

      const high =
        gaps.filter(
          (item) =>
            item.status === "HIGH"
        ).length;

      const medium =
        gaps.filter(
          (item) =>
            item.status === "MEDIUM"
        ).length;

      const good =
        gaps.filter(
          (item) =>
            item.status === "GOOD"
        ).length;

      res.json({
        success: true,

        target: {
          id: target._id,
          name: target.name,
          type: target.type,
          role: target.role,
          salary: target.salary,
        },

        summary: {
          high,
          medium,
          good,
        },

        gaps,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not calculate skill gap.",
      });
    }
  }
);


// ======================================================
// RESUME UPLOAD
// ======================================================

const handleResumeUpload = (req, res, next) => {
  upload.fields([{ name: "resume", maxCount: 1 }, { name: "file", maxCount: 1 }])(req, res, (err) => {
    if (err) return next(err);
    if (req.files) {
      req.file = req.files.resume?.[0] || req.files.file?.[0] || req.file;
    }
    next();
  });
};

const processResumeUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }

      const user =
        await User.findById(
          req.userId
        );

      // Remove previous resume record
      if (user.resumeId) {
        await Resume.findByIdAndDelete(
          user.resumeId
        );
      }

      const resume =
        await Resume.create({
          userId: user._id,

          originalName:
            req.file.originalname,

          filename:
            req.file.filename,

          path:
            req.file.path,

          size:
            req.file.size,
        });

      user.resumeUploaded =
        true;

      user.resumeId =
        resume._id;

      await user.save();

      res.status(201).json({
        success: true,
        message:
          "Resume uploaded successfully.",

        resume: {
          id: resume._id,
          originalName:
            resume.originalName,
          size:
            resume.size,
          uploadedAt:
            resume.uploadedAt,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Resume upload failed.",
      });
    }
};

app.post("/api/resume", authenticate, handleResumeUpload, processResumeUpload);
app.post("/api/resume/upload", authenticate, handleResumeUpload, processResumeUpload);


// ======================================================
// GET RESUME
// ======================================================

app.get(
  "/api/resume",
  authenticate,
  async (req, res) => {
    try {
      const resume =
        await Resume.findOne({
          userId: req.userId,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        resume: resume || null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not load resume.",
      });
    }
  }
);


// ======================================================
// DELETE RESUME
// ======================================================

app.delete(
  "/api/resume",
  authenticate,
  async (req, res) => {
    try {
      const resume =
        await Resume.findOne({
          userId: req.userId,
        }).sort({
          createdAt: -1,
        });

      if (!resume) {
        return res.status(404).json({
          success: false,
          message:
            "No resume found.",
        });
      }

      if (
        fs.existsSync(
          resume.path
        )
      ) {
        fs.unlinkSync(
          resume.path
        );
      }

      await Resume.findByIdAndDelete(
        resume._id
      );

      await User.findByIdAndUpdate(
        req.userId,
        {
          resumeUploaded: false,
          resumeId: null,
        }
      );

      res.json({
        success: true,
        message:
          "Resume deleted.",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not delete resume.",
      });
    }
  }
);


// ======================================================
// APPLICATION TRACKER
// ======================================================

// Get applications
app.get(
  "/api/applications",
  authenticate,
  async (req, res) => {
    try {
      const applications =
        await Application.find({
          userId: req.userId,
        }).sort({
          appliedDate: -1,
        });

      res.json({
        success: true,
        applications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not load applications.",
      });
    }
  }
);


// Add application
app.post(
  "/api/applications",
  authenticate,
  async (req, res) => {
    try {
      const {
        company,
        role,
        status,
        appliedDate,
        notes,
        jobId,
        applicationUrl,
        location,
      } = req.body;

      if (!company || !role) {
        return res.status(400).json({
          success: false,
          message:
            "Company and role are required.",
        });
      }

      const application =
        await Application.create({
          userId: req.userId,

          company,

          role,

          status:
            status || "Applied",

          appliedDate:
            appliedDate ||
            new Date(),

          notes:
            notes || "",

          jobId:
            jobId || "",

          applicationUrl:
            applicationUrl || "",

          location:
            location || "",
        });

      res.status(201).json({
        success: true,
        message:
          "Application added.",
        application,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not add application.",
      });
    }
  }
);


// Update application
app.put(
  "/api/applications/:id",
  authenticate,
  async (req, res) => {
    try {
      const application =
        await Application.findOne({
          _id: req.params.id,
          userId: req.userId,
        });

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found.",
        });
      }

      const {
        company,
        role,
        status,
        appliedDate,
        notes,
        jobId,
        applicationUrl,
        location,
      } = req.body;

      if (company !== undefined) {
        application.company =
          company;
      }

      if (role !== undefined) {
        application.role =
          role;
      }

      if (status !== undefined) {
        application.status =
          status;
      }

      if (appliedDate !== undefined) {
        application.appliedDate =
          appliedDate;
      }

      if (notes !== undefined) {
        application.notes =
          notes;
      }

      if (jobId !== undefined) {
        application.jobId =
          jobId;
      }

      if (applicationUrl !== undefined) {
        application.applicationUrl =
          applicationUrl;
      }

      if (location !== undefined) {
        application.location =
          location;
      }

      await application.save();

      res.json({
        success: true,
        message:
          "Application updated.",
        application,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not update application.",
      });
    }
  }
);


// Delete application
app.delete(
  "/api/applications/:id",
  authenticate,
  async (req, res) => {
    try {
      const result =
        await Application.deleteOne({
          _id: req.params.id,
          userId: req.userId,
        });

      if (
        result.deletedCount === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found.",
        });
      }

      res.json({
        success: true,
        message:
          "Application deleted.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not delete application.",
      });
    }
  }
);


// ======================================================
// DSA TOPICS
// ======================================================

const dsaTopics = [
  {
    topic: "Arrays",
    total: 10,
  },
  {
    topic: "Strings",
    total: 10,
  },
  {
    topic: "Hashing",
    total: 10,
  },
  {
    topic: "Linked List",
    total: 10,
  },
  {
    topic: "Stack",
    total: 8,
  },
  {
    topic: "Queue",
    total: 8,
  },
  {
    topic: "Trees",
    total: 10,
  },
  {
    topic: "Graphs",
    total: 10,
  },
  {
    topic: "Heap",
    total: 8,
  },
  {
    topic: "Recursion",
    total: 8,
  },
  {
    topic: "Binary Search",
    total: 8,
  },
  {
    topic: "Dynamic Programming",
    total: 10,
  },
];


// ======================================================
// GET DSA PROGRESS
// ======================================================

app.get(
  "/api/dsa/progress",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.userId
        );

      const saved =
        user.dsaProgress || [];

      const result =
        dsaTopics.map(
          (topic) => {
            const existing =
              saved.find(
                (item) =>
                  item.topic ===
                  topic.topic
              );

            return {
              topic:
                topic.topic,

              completed:
                existing?.completed ||
                0,

              total:
                topic.total,

              progress:
                topic.total > 0
                  ? Math.round(
                      ((existing?.completed ||
                        0) /
                        topic.total) *
                        100
                    )
                  : 0,
            };
          }
        );

      res.json({
        success: true,
        progress: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not load DSA progress.",
      });
    }
  }
);


// ======================================================
// UPDATE DSA PROGRESS
// ======================================================

app.put(
  "/api/dsa/progress/:topic",
  authenticate,
  async (req, res) => {
    try {
      const {
        completed,
      } = req.body;

      const topic =
        dsaTopics.find(
          (item) =>
            item.topic ===
            req.params.topic
        );

      if (!topic) {
        return res.status(404).json({
          success: false,
          message:
            "DSA topic not found.",
        });
      }

      const user =
        await User.findById(
          req.userId
        );

      const index =
        user.dsaProgress.findIndex(
          (item) =>
            item.topic ===
            topic.topic
        );

      const safeCompleted =
        Math.max(
          0,
          Math.min(
            Number(completed) || 0,
            topic.total
          )
        );

      const newProgress = {
        topic:
          topic.topic,

        completed:
          safeCompleted,

        total:
          topic.total,
      };

      if (index === -1) {
        user.dsaProgress.push(
          newProgress
        );
      } else {
        user.dsaProgress[index] =
          newProgress;
      }

      await user.save();

      res.json({
        success: true,
        message:
          "DSA progress updated.",
        progress:
          newProgress,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not update DSA progress.",
      });
    }
  }
);


// ======================================================
// ROADMAP
// ======================================================

app.get(
  "/api/roadmap",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.userId
        );

      res.json({
        success: true,
        roadmap:
          user.roadmap || [],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Could not load roadmap.",
      });
    }
  }
);


// ======================================================
// GENERATE ROADMAP
// ======================================================

app.post(
  "/api/roadmap/generate",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.userId
        ).populate(
          "selectedTarget"
        );

      if (!user.selectedTarget) {
        return res.status(400).json({
          success: false,
          message:
            "Select a target before generating a roadmap.",
        });
      }

      const target =
        user.selectedTarget;

      const currentSkills =
        user.skills || [];

      const gaps =
        target.requirements
          .map(
            (requirement) => {
              const current =
                currentSkills.find(
                  (skill) =>
                    skill.name.toLowerCase() ===
                    requirement.skill.toLowerCase()
                );

              const currentLevel =
                current?.level ||
                "Beginner";

              const gap =
                levelValue(
                  requirement.requiredLevel
                ) -
                levelValue(
                  currentLevel
                );

              return {
                skill:
                  requirement.skill,
                gap,
              };
            }
          )
          .filter(
            (item) =>
              item.gap > 0
          )
          .sort(
            (a, b) =>
              b.gap - a.gap
          );

      const roadmap = [];

      let week = 1;

      for (
        const item of gaps
      ) {
        roadmap.push({
          week,

          task:
            `Improve ${item.skill} from your current level toward the target requirement.`,

          category:
            "Skill Development",

          completed: false,
        });

        week++;

        if (week > 4) {
          break;
        }
      }

      if (
        roadmap.length < 4
      ) {
        roadmap.push({
          week: roadmap.length + 1,

          task:
            "Practice representative DSA questions.",

          category:
            "DSA",

          completed: false,
        });
      }

      if (
        roadmap.length < 4
      ) {
        roadmap.push({
          week: roadmap.length + 1,

          task:
            "Improve one relevant project and document it clearly.",

          category:
            "Projects",

          completed: false,
        });
      }

      if (
        roadmap.length < 4
      ) {
        roadmap.push({
          week: roadmap.length + 1,

          task:
            "Prepare technical and behavioral interview topics.",

          category:
            "Interview",

          completed: false,
        });
      }

      user.roadmap =
        roadmap;

      await user.save();

      res.json({
        success: true,
        message:
          "Roadmap generated.",
        roadmap:
          user.roadmap,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not generate roadmap.",
      });
    }
  }
);


// ======================================================
// UPDATE ROADMAP TASK
// ======================================================

app.put(
  "/api/roadmap/task/:id",
  authenticate,
  async (req, res) => {
    try {
      const {
        completed,
      } = req.body;

      const user =
        await User.findById(
          req.userId
        );

      const task =
        user.roadmap.id(
          req.params.id
        );

      if (!task) {
        return res.status(404).json({
          success: false,
          message:
            "Roadmap task not found.",
        });
      }

      task.completed =
        Boolean(completed);

      await user.save();

      res.json({
        success: true,
        message:
          "Roadmap task updated.",
        task,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not update roadmap task.",
      });
    }
  }
);


// ======================================================
// READINESS SCORE
// ======================================================

app.get(
  "/api/readiness",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.userId
        ).populate(
          "selectedTarget"
        );

      let technicalScore =
        0;

      if (
        user.selectedTarget &&
        user.selectedTarget
          .requirements.length > 0
      ) {
        let total = 0;
        let achieved = 0;

        for (
          const requirement of
            user.selectedTarget
              .requirements
        ) {
          const current =
            user.skills.find(
              (skill) =>
                skill.name.toLowerCase() ===
                requirement.skill.toLowerCase()
            );

          total += levelValue(
            requirement.requiredLevel
          );

          achieved += Math.min(
            levelValue(
              current?.level ||
                "Beginner"
            ),
            levelValue(
              requirement.requiredLevel
            )
          );
        }

        technicalScore =
          total > 0
            ? Math.round(
                (achieved /
                  total) *
                  100
              )
            : 0;
      }

      const dsa =
        user.dsaProgress || [];

      const dsaTotal =
        dsa.reduce(
          (sum, item) =>
            sum +
            (item.total || 0),
          0
        );

      const dsaCompleted =
        dsa.reduce(
          (sum, item) =>
            sum +
            (item.completed || 0),
          0
        );

      const dsaScore =
        dsaTotal > 0
          ? Math.round(
              (dsaCompleted /
                dsaTotal) *
                100
            )
          : 0;

      const resumeScore =
        user.resumeUploaded
          ? 100
          : 0;

      const roadmap =
        user.roadmap || [];

      const completedRoadmap =
        roadmap.filter(
          (item) =>
            item.completed
        ).length;

      const roadmapScore =
        roadmap.length > 0
          ? Math.round(
              (completedRoadmap /
                roadmap.length) *
                100
            )
          : 0;

      const interviewScore =
        user.interviewProgress
          .length > 0
          ? Math.min(
              100,
              user.interviewProgress
                .length * 10
            )
          : 0;

      const projectsScore =
        0;

      const readiness =
        Math.round(
          technicalScore * 0.25 +
            dsaScore * 0.20 +
            projectsScore * 0.20 +
            resumeScore * 0.15 +
            interviewScore * 0.10 +
            roadmapScore * 0.10
        );

      res.json({
        success: true,

        score: readiness,

        breakdown: {
          technicalSkills:
            technicalScore,

          dsa:
            dsaScore,

          projects:
            projectsScore,

          resume:
            resumeScore,

          interview:
            interviewScore,

          roadmap:
            roadmapScore,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not calculate readiness.",
      });
    }
  }
);


// ======================================================
// DASHBOARD
// ======================================================

app.get(
  "/api/dashboard",
  authenticate,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.userId
        )
          .select("-password")
          .populate(
            "selectedTarget"
          );

      const applications =
        await Application.find({
          userId: req.userId,
        });

      const dsa =
        user.dsaProgress || [];

      const dsaTotal =
        dsa.reduce(
          (sum, item) =>
            sum +
            (item.total || 0),
          0
        );

      const dsaCompleted =
        dsa.reduce(
          (sum, item) =>
            sum +
            (item.completed || 0),
          0
        );

      const dsaProgress =
        dsaTotal > 0
          ? Math.round(
              (dsaCompleted /
                dsaTotal) *
                100
            )
          : 0;

      const roadmap =
        user.roadmap || [];

      const roadmapCompleted =
        roadmap.filter(
          (task) =>
            task.completed
        ).length;

      const roadmapProgress =
        roadmap.length > 0
          ? Math.round(
              (roadmapCompleted /
                roadmap.length) *
                100
            )
          : 0;

      let topSkillGaps = [];

      if (
        user.selectedTarget
      ) {
        topSkillGaps =
          user.selectedTarget
            .requirements
            .map(
              (requirement) => {
                const current =
                  user.skills.find(
                    (skill) =>
                      skill.name.toLowerCase() ===
                      requirement.skill.toLowerCase()
                  );

                const gap =
                  levelValue(
                    requirement.requiredLevel
                  ) -
                  levelValue(
                    current?.level ||
                      "Beginner"
                  );

                return {
                  skill:
                    requirement.skill,

                  current:
                    current?.level ||
                    "Beginner",

                  required:
                    requirement.requiredLevel,

                  gap,
                };
              }
            )
            .filter(
              (item) =>
                item.gap > 0
            )
            .sort(
              (a, b) =>
                b.gap - a.gap
            )
            .slice(0, 3);
      }

      res.json({
        success: true,

        user,

        target:
          user.selectedTarget ||
          null,

        dsaProgress,

        roadmapProgress,

        applicationCount:
          applications.length,

        resumeUploaded:
          user.resumeUploaded,

        topSkillGaps,

        hasTarget:
          Boolean(
            user.selectedTarget
          ),
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Could not load dashboard.",
      });
    }
  }
);


// ======================================================
// JOBS DISCOVERY
// ======================================================

app.get(
  "/api/jobs/career-links",
  async (req, res) => {
    try {
      const links = CAREER_PORTALS.map(portal => ({
        id: portal.id,
        name: portal.name,
        logo: portal.logo,
        careerUrl: portal.careerUrl,
        category: portal.category,
        rolesCount: portal.roles.length,
      }));

      res.json({
        success: true,
        links,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Could not fetch career links.",
      });
    }
  }
);

app.get(
  "/api/jobs",
  async (req, res) => {
    try {
      const { role, location, jobType, skills, company, experience } = req.query;
      const jobApiUrl = process.env.JOB_API_URL;
      const jobApiKey = process.env.JOB_API_KEY;

      // If external Job API is configured, attempt to fetch live jobs
      if (jobApiUrl && jobApiKey) {
        try {
          const query = [role, location].filter(Boolean).join(" in ");
          const url = new URL(jobApiUrl);
          url.searchParams.set("query", query || "Software Engineer India");
          url.searchParams.set("num_pages", "1");

          const response = await fetch(url.toString(), {
            headers: {
              "X-RapidAPI-Key": jobApiKey,
              "X-RapidAPI-Host": new URL(jobApiUrl).hostname,
            },
          });

          if (response.ok) {
            const data = await response.json();
            const rawJobs = data.data || data.jobs || data.results || [];
            const jobs = rawJobs.map((item, idx) => ({
              id: item.job_id || `api-${idx}`,
              companyName: item.employer_name || item.company || "Company",
              companyLogo: item.employer_logo || "💼",
              title: item.job_title || item.title || "Software Engineer",
              location: item.job_city ? `${item.job_city}, ${item.job_country || ''}` : (item.location || "India"),
              jobType: item.job_employment_type || "Full Time",
              experience: item.job_required_experience?.required_experience_in_months
                ? `${Math.round(item.job_required_experience.required_experience_in_months / 12)} years`
                : "Fresher / 0-1 years",
              salary: item.job_min_salary ? `₹${item.job_min_salary} - ₹${item.job_max_salary}` : null,
              description: item.job_description ? item.job_description.slice(0, 300) + '...' : '',
              skills: item.job_required_skills || ['Programming', 'Problem Solving'],
              postedDate: item.job_posted_at_datetime_utc || new Date().toISOString(),
              source: "external_api",
              sourceName: item.job_publisher || "Live Job Board",
              applicationUrl: item.job_apply_link || item.url || "#",
              matchPercent: 0,
              matchedSkills: [],
              missingSkills: [],
              category: "External",
            }));

            return res.json({
              success: true,
              configured: true,
              source: "external_api",
              jobs,
            });
          }
        } catch (apiErr) {
          console.error("External Job API error, falling back to curated portals:", apiErr.message);
        }
      }

      // Default: Return curated career portal opportunities
      const jobs = generatePortalJobs({
        role,
        skills,
        location,
        jobType,
        experience,
        company,
      });

      res.json({
        success: true,
        configured: Boolean(jobApiUrl && jobApiKey),
        source: "career_portal",
        jobs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Could not load jobs.",
      });
    }
  }
);


// ======================================================
// 404
// ======================================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        "API route not found.",
    });
  }
);


// ======================================================
// ERROR HANDLER
// ======================================================

app.use(
  (error, req, res, next) => {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong.",
    });
  }
);


// ======================================================
// START SERVER
// ======================================================

async function startServer() {
  await connectDatabase();

  app.listen(
    PORT,
    () => {
      console.log(
        `SkillGap backend running on http://localhost:${PORT}`
      );
    }
  );
}

startServer();