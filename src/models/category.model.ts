import mongoose from "mongoose";
import { CategoryInterface } from './../interfaces/category.interface';

const categorySchema = new mongoose.Schema<CategoryInterface>(
  {
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    description: {type: String}
  },
  {versionKey: false}
)

const Category = mongoose.model("categories", categorySchema);

export default Category;