import mongoose from "mongoose";
import { TemplateInterface } from "../interfaces/template.interface";

const templateSchema = new mongoose.Schema<TemplateInterface>(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { versionKey: false }
);

const Template = mongoose.model("templates", templateSchema)

export default Template;