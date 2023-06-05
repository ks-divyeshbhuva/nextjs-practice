import { CommentsDto } from "@/dto/commentsDto/commentsDto";
import { useState } from "react";

const CommentsPage = () => {
  const [comments, setComments] = useState<CommentsDto[] | null>(null);
  const [newComment, setNewComment] = useState<string>("");

  const fetchComments = async () => {
    const res = await fetch("/api/comments");
    const data = (await res.json()) as CommentsDto[];
    setComments(data);
  };

  const SubmitComment = async () => {
    if (newComment !== "") {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ content: newComment }),
        headers: { "content-type": "application/json" },
      });
      const data = (await res.json()) as CommentsDto[];
      console.log(data);
      setNewComment("");
    }
  };

  const handleDelete = async (commentid: string | number) => {
    const res = await fetch(`/api/comments/${commentid}`, {
      method: "DELETE",
    });
    const data = (await res.json()) as CommentsDto[];
    console.log(data);
    fetchComments();
  };

  return (
    <div className="commentpage first-container">
      <h2>Comments Page</h2>
      <br />
      <button className="button" onClick={fetchComments}>
        Load Comments
      </button>
      <br />
      <br />
      <div>
        <input
          type="text"
          value={newComment}
          className="comments-input"
          placeholder="Enter comments"
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="button" onClick={SubmitComment}>
          Submit
        </button>
      </div>

      {comments?.map((elem) => {
        return (
          <div key={elem.id}>
            <p>
              {elem.id}. {elem.content}
              <button onClick={() => handleDelete(elem.id)}>❌</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsPage;
