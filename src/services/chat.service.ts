import { model } from '../config/gemini.config';

export const chatService = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  const response = result.response.text()

  return response;
}