import { TemplateInterface } from "../interfaces/template.interface";
import Template from "../models/template.model";

class TemplateService {
  static getAll = async (): Promise<TemplateInterface[] | null> => {
    return await Template.find({});
  };

  static getById = async (id: string): Promise<TemplateInterface | null> => {
    return await Template.findById(id);
  };

  static create = async (template: TemplateInterface): Promise<TemplateInterface | null> => {
    return await Template.create(template);
  };

  static update = async (
    id: string,
    template: TemplateInterface
  ): Promise<TemplateInterface | null> => {
    return await Template.findByIdAndUpdate(id, template, { new: true });
  };

  static delete = async (id: string): Promise<TemplateInterface | null> => {
    return await Template.findByIdAndDelete(id);
  };
}

export default TemplateService;
