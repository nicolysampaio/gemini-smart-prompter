import { Document, Schema } from "mongoose";

export interface TemplateInterface extends Document {
  id: Schema.Types.ObjectId;
  title: string;
  content: string;
  categories: Schema.Types.ObjectId[];
}
