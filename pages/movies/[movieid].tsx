import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";

const movieListURL = "https://6371fb0e025414c63702d396.mockapi.io/movies";

export interface Params extends ParsedUrlQuery {
  movieid: string;
}
// static props ----------------------------------------------------------------
export const getStaticProps: GetStaticProps<any, Params> = async (context) => {
  const { params } = context;
  const res = await fetch(`${movieListURL}/${params?.movieid}`);
  const data = await res.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }
  return { props: { data }, revalidate: 10 };
};
// static paths ----------------------------------------------------------------
export const getStaticPaths: GetStaticPaths | {} = async () => {
  const res = await fetch(`${movieListURL}`);
  const mvList: { id: string }[] = await res.json();
  const movieIdList = mvList.slice(0, 3);

  const paths: {}[] = movieIdList.map((elem, idx) => {
    return { params: { movieid: elem.id } };
  });

  return { paths, fallback: "blocking" };
};

// ui component ----------------------------------------------------------------
const MovieDetails = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  return (
    <div>
      <h1>Movie details</h1>
      <img
        className="movie-poster"
        src={data?.poster}
        alt={`${data?.name} poster`}
      />
      <h2>{data?.name}</h2>
      <h4>⭐ {data?.rating}</h4>
      <p>{data?.summary}</p>
      <br />
      <div className="btn-group">
        <button className="button" onClick={() => router.push("/movies")}>
          Back to movies
        </button>
        <button className="button" onClick={() => router.push("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
