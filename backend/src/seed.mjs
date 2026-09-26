import dotenv from "dotenv";
import mongoose from "mongoose";
import Target from "./models/Target.mjs";

dotenv.config();

const targets = [
  {
    type: "Company",

    name: "Amazon",

    role: "Software Development Engineer",

    salary: "₹10–20 LPA Preparation Profile",

    requirements: [
      {
        skill: "DSA",
        requiredLevel: "Advanced",
      },
      {
        skill: "OOP",
        requiredLevel: "Advanced",
      },
      {
        skill: "DBMS",
        requiredLevel: "Advanced",
      },
      {
        skill: "SQL",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Operating Systems",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Computer Networks",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Git/GitHub",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Problem Solving",
        requiredLevel: "Advanced",
      },
    ],
  },

  {
    type: "Company",

    name: "Microsoft",

    role: "Software Engineer",

    salary: "₹15–25 LPA Preparation Profile",

    requirements: [
      {
        skill: "DSA",
        requiredLevel: "Advanced",
      },
      {
        skill: "OOP",
        requiredLevel: "Advanced",
      },
      {
        skill: "DBMS",
        requiredLevel: "Advanced",
      },
      {
        skill: "SQL",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Operating Systems",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Computer Networks",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Git/GitHub",
        requiredLevel: "Intermediate",
      },
    ],
  },

  {
    type: "Role",

    name: "Software Developer",

    role: "Software Developer",

    salary: "₹10–20 LPA Preparation Profile",

    requirements: [
      {
        skill: "DSA",
        requiredLevel: "Advanced",
      },
      {
        skill: "OOP",
        requiredLevel: "Advanced",
      },
      {
        skill: "DBMS",
        requiredLevel: "Advanced",
      },
      {
        skill: "SQL",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Git/GitHub",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Problem Solving",
        requiredLevel: "Advanced",
      },
    ],
  },

  {
    type: "Role",

    name: "Frontend Developer",

    role: "Frontend Developer",

    salary: "₹6–12 LPA Preparation Profile",

    requirements: [
      {
        skill: "HTML/CSS",
        requiredLevel: "Advanced",
      },
      {
        skill: "JavaScript",
        requiredLevel: "Advanced",
      },
      {
        skill: "React",
        requiredLevel: "Advanced",
      },
      {
        skill: "Git/GitHub",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Problem Solving",
        requiredLevel: "Intermediate",
      },
    ],
  },

  {
    type: "Role",

    name: "Backend Developer",

    role: "Backend Developer",

    salary: "₹8–16 LPA Preparation Profile",

    requirements: [
      {
        skill: "JavaScript",
        requiredLevel: "Advanced",
      },
      {
        skill: "Node.js",
        requiredLevel: "Advanced",
      },
      {
        skill: "Express.js",
        requiredLevel: "Advanced",
      },
      {
        skill: "MongoDB",
        requiredLevel: "Intermediate",
      },
      {
        skill: "REST API",
        requiredLevel: "Advanced",
      },
      {
        skill: "Git/GitHub",
        requiredLevel: "Intermediate",
      },
    ],
  },

  {
    type: "Salary",

    name: "₹10 LPA",

    role: "General Software Development",

    salary: "₹10 LPA",

    requirements: [
      {
        skill: "DSA",
        requiredLevel: "Intermediate",
      },
      {
        skill: "OOP",
        requiredLevel: "Intermediate",
      },
      {
        skill: "DBMS",
        requiredLevel: "Intermediate",
      },
      {
        skill: "SQL",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Git/GitHub",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Problem Solving",
        requiredLevel: "Intermediate",
      },
    ],
  },

  {
    type: "Salary",

    name: "₹20 LPA",

    role: "General Software Development",

    salary: "₹20 LPA",

    requirements: [
      {
        skill: "DSA",
        requiredLevel: "Advanced",
      },
      {
        skill: "OOP",
        requiredLevel: "Advanced",
      },
      {
        skill: "DBMS",
        requiredLevel: "Advanced",
      },
      {
        skill: "SQL",
        requiredLevel: "Advanced",
      },
      {
        skill: "Operating Systems",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Computer Networks",
        requiredLevel: "Intermediate",
      },
      {
        skill: "Git/GitHub",
        requiredLevel: "Advanced",
      },
      {
        skill: "Problem Solving",
        requiredLevel: "Advanced",
      },
    ],
  },
];


async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected."
    );

    await Target.deleteMany({});

    await Target.insertMany(
      targets
    );

    console.log(
      "Target data inserted successfully."
    );

    await mongoose.disconnect();

    console.log(
      "Database disconnected."
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Seed failed:"
    );

    console.error(
      error.message
    );

    process.exit(1);
  }
}

seed();