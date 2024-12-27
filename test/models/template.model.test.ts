import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Template from "../../src/models/template.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
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
  const template = new Template({ title, content });
  return await template.save();
};

describe("Template schema validation and database operations", () => {
  it("should return an empty array when no templates are created", async () => {
    const templates = await Template.find();

    expect(templates).toEqual([]);
  });

  it("should return a list with one template after creating it", async () => {
    const template = {
      title: "Template 1",
      content: "Content related to template 1",
    };
    await createTemplate(template.title, template.content);

    const templates = await Template.find();

    expect(templates.length).toBe(1);
    expect(templates[0].title).toBe(template.title);
    expect(templates[0].content).toBe(template.content);
  });

  it("should return a list with multiple templates after creating them", async () => {
    const templates = [
      new Template({
        title: "Template 1",
        content: "Content for template 1",
      }),
      new Template({
        title: "Template 2",
        content: "Content for template 2",
      }),
      new Template({
        title: "Template 3",
        content: "Content for template 3",
      }),
    ];

    await Template.create(templates);

    const templateList = await Template.find();

    expect(templateList.length).toBe(3);
    expect(templateList[0].title).toBe("Template 1");
    expect(templateList[1].title).toBe("Template 2");
    expect(templateList[2].title).toBe("Template 3");
    expect(templateList[0].content).toBe("Content for template 1");
    expect(templateList[1].content).toBe("Content for template 2");
    expect(templateList[2].content).toBe("Content for template 3");
  });

  it("should return null when template does not exist", async () => {
    const template = await Template.findById("000000000000");

    expect(template).toBeNull();
  });

  it("should return one template when it exists", async () => {
    const template = {
      title: "Template 1",
      content: "Content related to template 1",
    };
    const createdTemplate = await createTemplate(
      template.title,
      template.content
    );
    
    const foundTemplate = await Template.findById(createdTemplate._id);

    expect(foundTemplate).not.toBeNull();
    expect(foundTemplate!.title).toBe(template.title);
    expect(foundTemplate!.content).toBe(template.content);
  });

  it("should successfully create a template", async () => {
    const template = {
      title: "Template 1",
      content: "Content related to template 1",
    };
    const createdTemplate = await createTemplate(
      template.title,
      template.content
    );

    expect(createdTemplate._id).toBeDefined();
    expect(createdTemplate.title).toBe("Template 1");
    expect(createdTemplate.content).toBe("Content related to template 1");
  });

  it("should not create a template without a title", async () => {
    const template = new Template({content: "Content without a title"});
    
    await expect(template.save()).rejects.toThrowError("Path `title` is required.");
  })

  it("should update an existing template", async () => {
    const template = {
      title: "Template 1",
      content: "Content related to template 1",
    };
    const createdTemplate = await createTemplate(
      template.title,
      template.content
    );
    
    const updatedTemplate = await Template.findByIdAndUpdate(
      createdTemplate._id,
      { content: "Updated content" },
      { new: true }
    );

    expect(updatedTemplate).not.toBeNull();
    expect(updatedTemplate!.title).toBe(template.title);
    expect(updatedTemplate!.content).toBe("Updated content");
  });

  it("should return null when updating a non-existing template", async () => {
    const template = await Template.findByIdAndUpdate(
      "000000000000",
      { content: "Updated content" },
      { new: true }
    );

    expect(template).toBeNull();
  });

  it("should delete one template", async () => {
    const template = {
      title: "Template 1",
      content: "Content related to template 1",
    };
    const createdTemplate = await createTemplate(
      template.title,
      template.content
    );

    await Template.findByIdAndDelete(createdTemplate._id);

    const deletedTemplate = await Template.findById(createdTemplate._id);

    expect(deletedTemplate).toBeNull();
  });

  it("should return null when deleting a non-existing template", async () => {
    const template = await Template.findByIdAndDelete("000000000000");

    expect(template).toBeNull();
  });
});
