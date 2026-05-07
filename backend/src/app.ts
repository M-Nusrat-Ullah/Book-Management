import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler, notFound } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true
  })
);

app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100
  })
);

if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Book Management API is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;