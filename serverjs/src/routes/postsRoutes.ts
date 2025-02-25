import { Router } from "express";
import { getAllPosts, getPostById } from "../controllers/postsController";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);

export default router;
