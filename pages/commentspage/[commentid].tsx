import { comments } from "@/data/comment";
import { CommentsDto } from "@/dto/commentsDto/commentsDto";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// static props ----------------------------------------------------------------
export const getStaticProps: GetStaticProps<any, Params> = async (context) => {
  const { params } = context;

  const comment = comments.find((c) => c.id === parseInt(params?.commentid));
  console.log("in static props : ", comment);

  if (!comment?.id) {
    return {
      notFound: true,
    };
  }

  return { props: { comment }, revalidate: 10 };
};

// static paths ----------------------------------------------------------------
export const getStaticPaths: GetStaticPaths | {} = async () => {
  const res = await fetch("http://localhost:3000/api/comments");

  const cmntList: { id: string | number }[] = await res.json();

  const paths: {}[] = cmntList.map((elem) => {
    return { params: { commentid: JSON.stringify(elem.id) } };
  });

  return { paths, fallback: false };
};

function CommentId({
  comment,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("in page : ", comment);

  return (
    <div>
      <p>
        {comment?.id}. - {comment?.content}
      </p>
    </div>
  );
}

export default CommentId;
