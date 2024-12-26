import { Document, Schema } from "mongoose";

export interface TemplateInterface extends Document{
  id: Schema.Types.UUID;
  title: string;
  content: string;
}
