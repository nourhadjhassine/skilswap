
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  contact: {
    whatsapp: String,
    facebook: String,
    instagram: String
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Skill", skillSchema);
