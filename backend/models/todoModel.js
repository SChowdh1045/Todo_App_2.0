import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  complete: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Todo", TodoSchema);