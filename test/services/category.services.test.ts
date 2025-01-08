import Category from "../../src/models/category.model";
import CategoryService from "../../src/services/category.service";
import { CategoryInterface } from "../../src/interfaces/category.interface";

jest.mock("../../src/models/category.model", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("Category business logic and database interaction", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCategory = {
    id: "000000000001",
    name: "Category 1",
    description: "Content related to category 1",
  };

  describe("Fetch Category", () => {
    it("should return an empty array if no categories exist", async () => {
      (Category.find as jest.Mock).mockResolvedValue([]);

      const categories = await CategoryService.getAll();

      expect(categories).toEqual([]);
    });
    it("should fetch all categories", async () => {
      const mockCategorys = [
        { ...mockCategory },
        {
          id: "000000000002",
          name: "Category 2",
          description: "Content related to category 2",
        },
      ];

      (Category.find as jest.Mock).mockResolvedValue(mockCategorys);

      const categories = await CategoryService.getAll();

      expect(Category.find).toHaveBeenCalled();
      expect(categories).toEqual(mockCategorys);
      expect(categories?.length).toBe(2);
    });

    it("should fetch category by ID", async () => {
      (Category.findById as jest.Mock).mockResolvedValue(mockCategory);

      const category = await CategoryService.getById("1");

      expect(Category.findById).toHaveBeenCalledWith("1");
      expect(category).toEqual(mockCategory);
    });

    it("should return null if no category is found", async () => {
      (Category.findById as jest.Mock).mockResolvedValue(null);

      const category = await CategoryService.getById("invalidID");

      expect(category).toBeNull();
    });
  });

  describe("Create Category", () => {
    it("should create a new category", async () => {
      (Category.create as jest.Mock).mockResolvedValue(mockCategory);

      const category = await CategoryService.create({
        name: "Category 1",
        description: "Content related to category 1",
      } as CategoryInterface);

      expect(Category.create).toHaveBeenCalledWith({
        name: "Category 1",
        description: "Content related to category 1",
      });
      expect(category).toEqual(mockCategory);
    });
  });

  describe("Update Category", () => {
    it("should update an existing category", async () => {
      const mockCategory = {
        id: "1",
        name: "Category 1",
        description: "Content related to category 1",
      };

      (Category.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockCategory);

      const category = await CategoryService.update("1", {
        name: "Category 1 - Update",
        description: "Updated description related to category 1",
      } as CategoryInterface);

      expect(category).toEqual(mockCategory);
      expect(Category.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        {
          name: "Category 1 - Update",
          description: "Updated description related to category 1",
        },
        { new: true }
      );
    });
  });

  describe("Delete Category", () => {
    it("should delete an existing category", async () => {
      const mockCategory = {
        id: "1",
        name: "Category 1",
        description: "Content related to category 1",
      };

      (Category.findByIdAndDelete as jest.Mock).mockResolvedValue(mockCategory);

      const category = await CategoryService.delete("1");

      expect(category).toEqual(mockCategory);
      expect(Category.findByIdAndDelete).toHaveBeenCalledWith("1");
    });
  });
});
