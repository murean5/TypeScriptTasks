import express from "express";
import postsRoutes from "./routes/postsRoutes";

const app = express();

app.use(express.json());
app.use("/api/posts", postsRoutes);

export default app;
