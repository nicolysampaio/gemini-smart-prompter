import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Category from "../../src/models/category.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  await Category.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

const createCategory = async (name: string, description?: string) => {
  const category = new Category({ name, description });
  return await category.save();
};

describe("Category schema validation and database operations", () => {
  it("should return an empty array whe no categories are created", async () => {
    const categories = await Category.find();

    expect(categories).toEqual([]);
  });
  it("should return a list with one category after creating it", async () => {
    const category = {
      name: "Category 1",
      description: "Description related to category 1",
    };
    await createCategory(category.name, category.description);

    const categories = await Category.find();

    expect(categories.length).toBe(1);
    expect(categories[0].name).toBe(category.name);
    expect(categories[0].description).toBe(category.description);
  });

  it("should return a list with multiple categories after creating them", async () => {
    const categories = [
      new Category({
        name: "Category 1",
        description: "Description for category 1",
      }),
      new Category({
        name: "Category 2",
        description: "Description for category 2",
      }),
      new Category({
        name: "Category 3",
        description: "Description for category 3",
      }),
    ];

    await Category.create(categories);

    const categoryList = await Category.find();

    expect(categoryList.length).toBe(3);
    expect(categoryList[0].name).toBe("Category 1");
    expect(categoryList[1].name).toBe("Category 2");
    expect(categoryList[2].name).toBe("Category 3");
    expect(categoryList[0].description).toBe("Description for category 1");
    expect(categoryList[1].description).toBe("Description for category 2");
    expect(categoryList[2].description).toBe("Description for category 3");
  });

  it("should return null when category does not exist", async () => {
    const category = await Category.findById("000000000000");

    expect(category).toBeNull();
  });

  it("should return one category when it exists", async () => {
    const category = {
      name: "Category 1",
      description: "Description related to category 1",
    };
    const createdCategory = await createCategory(
      category.name,
      category.description
    );

    const foundCategory = await Category.findById(createdCategory._id);

    expect(foundCategory).not.toBeNull();
    expect(foundCategory!.name).toBe(category.name);
    expect(foundCategory!.description).toBe(category.description);
  });

  it("should successfully create a category", async () => {
    const category = {
      name: "Category 1",
      description: "Description related to category 1",
    };
    const createdCategory = await createCategory(
      category.name,
      category.description
    );

    expect(createdCategory._id).toBeDefined();
    expect(createdCategory.name).toBe("Category 1");
    expect(createdCategory.description).toBe(
      "Description related to category 1"
    );
  });

  it("should not create a category without a name", async () => {
    const category = new Category({
      description: "Description without a name",
    });

    await expect(category.save()).rejects.toThrowError(
      "Path `name` is required."
    );
  });

  it("should create a category without a description", async () => {
    const category = {
      name: "Category 1",
    };
    const createdCategory = await createCategory(category.name);

    expect(createdCategory._id).toBeDefined();
    expect(createdCategory.name).toBe("Category 1");
    expect(createdCategory.description).toBeUndefined();
  });

  it("should update an existing category", async () => {
    const category = {
      name: "Category 1",
      description: "Description related to category 1",
    };
    const createdCategory = await createCategory(
      category.name,
      category.description
    );

    const updatedCategory = await Category.findByIdAndUpdate(
      createdCategory._id,
      { description: "Updated description" },
      { new: true }
    );

    expect(updatedCategory).not.toBeNull();
    expect(updatedCategory!.name).toBe(category.name);
    expect(updatedCategory!.description).toBe("Updated description");
  });

  it("should add a description to an existing category", async () => {
    const category = {
      name: "Category 1"
    };
    const createdCategory = await createCategory(
      category.name
    );

    const updatedCategory = await Category.findByIdAndUpdate(
      createdCategory._id,
      { description: "Added description" },
      { new: true }
    );

    expect(updatedCategory).not.toBeNull();
    expect(updatedCategory!.name).toBe(category.name);
    expect(updatedCategory!.description).toBe("Added description");
  });

  it("should return null when updating a non-existing category", async () => {
    const category = await Category.findByIdAndUpdate(
      "000000000000",
      { description: "Updated description" },
      { new: true }
    );

    expect(category).toBeNull();
  });

  it("should delete one category", async () => {
    const category = {
      name: "Category 1",
      description: "Description related to category 1",
    };
    const createdCategory = await createCategory(
      category.name,
      category.description
    );

    await Category.findByIdAndDelete(createdCategory._id);

    const deletedCategory = await Category.findById(createdCategory._id);

    expect(deletedCategory).toBeNull();
  });

  it("should return null when deleting a non-existing category", async () => {
    const category = await Category.findByIdAndDelete("000000000000");

    expect(category).toBeNull();
  });
});
