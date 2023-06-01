import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

export interface MovieModal {
  id: number;
  name: string;
  rating: number;
  summary: string;
  poster: string;
}

export const getStaticProps: GetStaticProps<{
  data: MovieModal[];
}> = async () => {
  const res = await fetch("https://6371fb0e025414c63702d396.mockapi.io/movies");
  const data = await res.json();

  return { props: { data }, revalidate: 10 };
};

export default function MovieList({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MovieData = data;

  return (
    <div>
      <h1>Movies Page</h1>
      <br />
      {MovieData.map((elem, idx) => {
        return (
          <div key={idx}>
            <h3>
              <Link href={`/movies/${elem.id}`}>{elem.name}</Link>
            </h3>
            <p>⭐ {elem.rating}</p>
            <br />
          </div>
        );
      })}
    </div>
  );
}
