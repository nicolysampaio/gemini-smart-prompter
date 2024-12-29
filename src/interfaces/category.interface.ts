import { Document, Schema } from "mongoose";

export interface CategoryInterface extends Document {
  id: Schema.Types.ObjectId;
  name: string;
  description?: string;
}