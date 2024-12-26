import { Request, Response } from "express";
import ChatService from "../services/chat.service";

export async function sendMessage(req: Request, res: Response) {
  try {
    const response = await ChatService.chat(req.body.prompt);

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
