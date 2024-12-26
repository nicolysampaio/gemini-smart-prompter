import express, { Application } from "express";
import routes from "./routes";
import databaseConnection from "./config/db.config";

async function connectDatabase() {
  try {
    await databaseConnection();

    console.log("Database connected with success!");
  } catch (err) {
    console.error("Failed to connect to MongoDB: ", err);
  }
}

connectDatabase();

const app: Application = express();
routes(app);

app.use(express.json());

export { app };
