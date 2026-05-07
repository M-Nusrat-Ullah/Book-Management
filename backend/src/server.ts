import { connectDB } from "./config/db";
import { env } from "./config/env";
import app from "./app";

const startServer = async () => {
  await connectDB();

  app.listen(Number(env.PORT), () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
};

startServer();