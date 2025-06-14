import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  salary: { type: Number, required: true },
  date: { type: Number, required: true },
  visible: { type: Boolean,default:true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  }, //creating a reference with the comapany in the comapany collection(connecting 2 clusters)
});


const jobsModel = mongoose.models.jobs || mongoose.model('jobs',jobSchema)

export default jobsModel