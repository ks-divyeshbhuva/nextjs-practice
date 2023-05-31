import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { Url } from "url";

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

  return { props: { data } };
};

export default function MovieList({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MovieData = data;

  return (
    <div>
      <h1>Movies Page</h1>
      <br />
      {data.map((elem, idx) => {
        return (
          <div key={idx}>
            <p className={`paragraph`}>
              <Link href={`/movies/${elem.id}`}>{elem.name}</Link> - ⭐{" "}
              {elem.rating}
            </p>
          </div>
        );
      })}
    </div>
  );
}
