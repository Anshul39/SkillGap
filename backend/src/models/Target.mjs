import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
      trim: true,
    },
    requiredLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
  },
  { _id: false }
);

const targetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Company", "Role", "Salary"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "",
    },
    salary: {
      type: String,
      default: "",
    },
    requirements: {
      type: [requirementSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Target = mongoose.model("Target", targetSchema);

export default Target;