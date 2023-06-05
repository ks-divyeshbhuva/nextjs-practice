import { comments } from "@/data/comment";
import { urlParams } from "@/dto/commentsDto/urlparams";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { commentid } = req.query as urlParams;

  if (req.method === "GET") {
    const comment = comments.find(
      (comment) => comment.id === parseInt(commentid as string)
    );
    res.status(200).json(comment);
  } else if (req.method === "DELETE") {
    const deletedComment = comments.find(
      (comment) => comment.id === parseInt(commentid as string)
    );
    // get index of deleted comment in array --------------------------------
    const index = comments.findIndex(
      (comment) => comment.id === parseInt(commentid as string)
    );
    // remove(splice) deleted comment from array --------------------------------
    comments.splice(index, 1);

    res.status(200).json(deletedComment);
  }
};

export default handler;
