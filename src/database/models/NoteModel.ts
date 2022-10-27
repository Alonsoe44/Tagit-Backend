import { model, Schema } from "mongoose";

const imageSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  images: {
    type: [imageSchema],
  },
  etiquettes: {
    type: [String],
    default: [],
  },
});

const NoteModel = model("Note", NoteSchema, "Notes");

export default NoteModel;
