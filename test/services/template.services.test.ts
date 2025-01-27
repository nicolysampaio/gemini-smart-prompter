import Template from "../../src/models/template.model";
import TemplateService from "../../src/services/template.service";
import { TemplateInterface } from "../../src/interfaces/template.interface";

jest.mock("../../src/models/template.model", () => ({
  find: jest.fn(() => ({
    populate: jest.fn(() => ({
      exec: jest.fn(),
    })),
  })),
  findById: jest.fn(() => ({
    populate: jest.fn(() => ({
      exec: jest.fn(),
    })),
  })),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("Template business logic and database interaction", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockTemplate = {
    id: "000000000001",
    title: "Template 1",
    content: "Content related to template 1",
  };

  describe("Fetch Template", () => {
    it("should return an empty array if no templates exist", async () => {
      (Template.find as jest.Mock).mockImplementation(() => ({
        populate: jest.fn(() => ({
          exec: jest.fn().mockResolvedValue([]),
        })),
      }));
      
      const templates = await TemplateService.getAll();

      expect(templates).toEqual([]);
    });
    it("should fetch all templates", async () => {
      const mockTemplates = [
        { ...mockTemplate },
        {
          id: "000000000002",
          title: "Template 2",
          content: "Content related to template 2",
        },
      ];

      (Template.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockTemplates),
        }),
      });

      const templates = await TemplateService.getAll();

      expect(Template.find).toHaveBeenCalled();
      expect(templates).toEqual(mockTemplates);
      expect(templates?.length).toBe(2);
    });

    it("should fetch template by ID", async () => {
      (Template.findById as jest.Mock).mockResolvedValue(mockTemplate);

      const template = await TemplateService.getById("1");

      expect(Template.findById).toHaveBeenCalledWith("1");
      expect(template).toEqual(mockTemplate);
    });

    it("should return null if no template is found", async () => {
      (Template.findById as jest.Mock).mockResolvedValue(null);

      const template = await TemplateService.getById("invalidID");

      expect(template).toBeNull();
    });
  });

  describe("Create Template", () => {
    it("should create a new template", async () => {
      (Template.create as jest.Mock).mockResolvedValue(mockTemplate);

      const template = await TemplateService.create({
        title: "Template 1",
        content: "Content related to template 1",
      } as TemplateInterface);

      expect(Template.create).toHaveBeenCalledWith({
        title: "Template 1",
        content: "Content related to template 1",
      });
      expect(template).toEqual(mockTemplate);
    });
  });

  describe("Update Template", () => {
    it("should update an existing template", async () => {
      const mockTemplate = {
        id: "1",
        title: "Template 1",
        content: "Content related to template 1",
      };

      (Template.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockTemplate);

      const template = await TemplateService.update("1", {
        title: "Template 1 - Update",
        content: "Updated content related to template 1",
      } as TemplateInterface);

      expect(template).toEqual(mockTemplate);
      expect(Template.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        {
          title: "Template 1 - Update",
          content: "Updated content related to template 1",
        },
        { new: true }
      );
    });
  });

  describe("Delete Template", () => {
    it("should delete an existing template", async () => {
      const mockTemplate = {
        id: "1",
        title: "Template 1",
        content: "Content related to template 1",
      };

      (Template.findByIdAndDelete as jest.Mock).mockResolvedValue(mockTemplate);

      const template = await TemplateService.delete("1");

      expect(template).toEqual(mockTemplate);
      expect(Template.findByIdAndDelete).toHaveBeenCalledWith("1");
    });
  });
});
