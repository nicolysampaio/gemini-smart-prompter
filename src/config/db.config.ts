import { connect, connection } from "mongoose";

async function databaseConnection() {
  await connect(process.env.MONGODB_CONNECTION_STRING as string);

  return connection;
}

export default databaseConnection;
