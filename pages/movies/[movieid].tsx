import { type FC } from "react";
import { useRouter } from "next/router";

export interface MovieDetailsProps {
  params: string;
}

const MovieDetails: FC<MovieDetailsProps> = ({ params }) => {
  const router = useRouter();
  const id = router.query.movieid;

  return (
    <div>
      Movie details
      <p>movie id : {id} </p>
    </div>
  );
};

export default MovieDetails;
