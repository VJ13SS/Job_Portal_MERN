import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, //reference with user collection
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job", required: true },
  status: { type: String, default: "Pending" },
  date: { type: Number, required: true },
});

const jobApplicationModel =
  mongoose.models.jobApplication ||
  mongoose.model("jobApplication", jobApplicationSchema);

export default jobApplicationModel;
