import { Request, Response } from "express";
import { chatService } from "../services/chat.service";

export async function sendMessage(req: Request, res: Response) {
  try {
    const { prompt } = req.body;

    const response = await chatService(prompt);

    res.status(200).json({ response });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error generating content",
        error: (error as Error).message,
      });
  }
}
