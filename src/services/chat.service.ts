import { model } from '../config/gemini.config';

class chatService {
  static chat = async (prompt: string) => {
    const result = await model.generateContent(prompt);
    const response = result.response.text()
  
    return response;
  };
}

export default chatService;