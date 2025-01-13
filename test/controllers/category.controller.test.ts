import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../src/app";
import Category from "../../src/models/category.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  await Category.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const createCategory = async (name: string, description: string) => {
  const category = {
    name,
    description,
  };

  const response = await supertest(app)
    .post("/api/v1/categories")
    .send(category);

  return response;
};

describe("Testing category routes", () => {
  it("should return an empty list when no category is created", async () => {
    const response = await supertest(app).get("/api/v1/categories");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it("should return a list after creating a category", async () => {
    const category = {
      name: "Category 1",
      description: "Description related to category 1",
    };

    const responsePost = await createCategory(category.name, category.description);
    const categoryId = responsePost.body.category._id;

    expect(responsePost.status).toEqual(201);
    expect(responsePost.body).toEqual({
      message: "Category created with success!",
      category: { _id: categoryId, ...category },
    });

    const response = await supertest(app).get("/api/v1/categories");

    expect(response.status).toBe(200);
    expect(response.body[0].description).toEqual(category.description);
    expect(response.body[0].name).toEqual(category.name);
  });

  it("should create a category", async () => {
    const category = {
      name: "Category 1",
      description: "Description related to category 1",
    };

    const responsePost = await createCategory(category.name, category.description);
    const categoryId = responsePost.body.category._id;

    expect(responsePost.status).toEqual(201);
    expect(responsePost.body).toEqual({
      message: "Category created with success!",
      category: { _id: categoryId, ...category },
    });
  });

  it("should update a category", async () => {
    const category = {
      name: "Category 1",
      description: "Description related to category 1",
    };

    const responsePost = await createCategory(category.name, category.description);
    const categoryId = responsePost.body.category._id;

    expect(responsePost.status).toEqual(201);
    expect(responsePost.body).toEqual({
      message: "Category created with success!",
      category: { _id: categoryId, ...category },
    });

    const body = {
      description: "Update category 1 description",
    };

    const response = await supertest(app)
      .put(`/api/v1/categories/${categoryId}`)
      .send(body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Category updated with success!");
    expect(response.body.category.name).toBe("Category 1");
    expect(response.body.category.description).toBe("Update category 1 description");
  });

  it("should delete a category", async () => {
    const category = {
      name: "Category 1",
      description: "Description related to category 1",
    };

    const responsePost = await createCategory(category.name, category.description);
    const categoryId = responsePost.body.category._id;

    expect(responsePost.status).toEqual(201);
    expect(responsePost.body).toEqual({
      message: "Category created with success!",
      category: { _id: categoryId, ...category },
    });

    const response = await supertest(app)
      .delete(`/api/v1/categories/${categoryId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Category deleted with success!");
  });
});
