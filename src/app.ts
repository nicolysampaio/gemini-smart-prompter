import express, { Application } from "express";
import routes from "./routes";
import databaseConnection from "./config/db.config";

const app: Application = express();
routes(app);

async function connectDatabase() {
  try {
    await databaseConnection();

    console.log("Database connected with success!");
  } catch (err) {
    console.error("Failed to connect to MongoDB: ", err);
  }
}

connectDatabase();

export { app };
