import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../src/app";
import Template from "../../src/models/template.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  await Template.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const createTemplate = async (title: string, content: string) => {
  const template = {
    title,
    content,
  };

  const response = await supertest(app)
    .post("/api/v1/templates")
    .send(template);

  return response;
};

describe("Testing template routes", () => {
  it("should return an empty list when no template is created", async () => {
    const response = await supertest(app).get("/api/v1/templates");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it("should return a list after creating a template", async () => {
    const template = {
      title: "Template 1",
      content: "Content related to template 1",
    };

    const responsePost = await createTemplate(template.title, template.content);
    const templateId = responsePost.body.template._id;

    expect(responsePost.status).toEqual(201);
    expect(responsePost.body).toEqual({
      message: "Template created with success!",
      template: { _id: templateId, ...template },
    });

    const response = await supertest(app).get("/api/v1/templates");

    expect(response.status).toBe(200);
    expect(response.body[0].content).toEqual(template.content);
    expect(response.body[0].title).toEqual(template.title);
  });

  it("should create a template", async () => {
    const template = {
      title: "Template 1",
      content: "Content related to template 1",
    };

    const responsePost = await createTemplate(template.title, template.content);
    const templateId = responsePost.body.template._id;

    expect(responsePost.status).toEqual(201);
    expect(responsePost.body).toEqual({
      message: "Template created with success!",
      template: { _id: templateId, ...template },
    });
  });

  it("should update a template", async () => {
    const template = {
      title: "Template 1",
      content: "Content related to template 1",
    };

    const responsePost = await createTemplate(template.title, template.content);
    const templateId = responsePost.body.template._id;

    expect(responsePost.status).toEqual(201);
    expect(responsePost.body).toEqual({
      message: "Template created with success!",
      template: { _id: templateId, ...template },
    });

    const body = {
      content: "Update template 1 content",
    };

    const response = await supertest(app)
      .put(`/api/v1/templates/${templateId}`)
      .send(body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Template updated with success!");
    expect(response.body.template.title).toBe("Template 1");
    expect(response.body.template.content).toBe("Update template 1 content");
  });

  it("should delete a template", async () => {
    const template = {
      title: "Template 1",
      content: "Content related to template 1",
    };

    const responsePost = await createTemplate(template.title, template.content);
    const templateId = responsePost.body.template._id;

    expect(responsePost.status).toEqual(201);
    expect(responsePost.body).toEqual({
      message: "Template created with success!",
      template: { _id: templateId, ...template },
    });

    const response = await supertest(app)
      .delete(`/api/v1/templates/${templateId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Template deleted with success!");
  });
});
