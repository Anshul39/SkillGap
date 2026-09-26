import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
  },
  { _id: false }
);

const dsaProgressSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },

    completed: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const roadmapTaskSchema = new mongoose.Schema(
  {
    week: Number,

    task: String,

    category: String,

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    college: {
      type: String,
      default: "",
    },

    course: {
      type: String,
      default: "",
    },

    year: {
      type: String,
      default: "",
    },

    selectedTarget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Target",
      default: null,
    },

    skills: {
      type: [skillSchema],
      default: [],
    },

    dsaProgress: {
      type: [dsaProgressSchema],
      default: [],
    },

    interviewProgress: {
      type: [String],
      default: [],
    },

    roadmap: {
      type: [roadmapTaskSchema],
      default: [],
    },

    resumeUploaded: {
      type: Boolean,
      default: false,
    },

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;