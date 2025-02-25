import { Request, Response } from "express";
import { fetchPosts, fetchPostById } from "../services/postsService";

export const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await fetchPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await fetchPostById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error fetching post" });
    }
};
