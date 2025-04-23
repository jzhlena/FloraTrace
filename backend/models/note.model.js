import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    note: { type: String, required: true },
  });

export default NoteSchema;