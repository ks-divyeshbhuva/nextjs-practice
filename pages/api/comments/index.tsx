import { comments } from "@/data/comment";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(200).json(comments);
  } else if (req.method === "POST") {
    const data = req.body.content;
    const newComment = {
      id: Date.now(),
      content: data,
    };

    comments.push(newComment);
    res.status(201).json(newComment);
  }
};

export default handler;
