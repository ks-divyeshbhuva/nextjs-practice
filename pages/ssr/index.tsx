import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

export interface marvelCharacters {
  id: number;
  name: string;
  alter_ego: string;
  gender: string;
  race: string;
  char_type: string;
}

export const getServerSideProps: GetServerSideProps<{
  data: marvelCharacters[];
}> = async () => {
  const res = await fetch(
    "https://6371fb0e025414c63702d396.mockapi.io/react_query"
  );
  const data = await res.json();
  return { props: { data } };
};

// ui component ----------------------------------------------------------------
function SsrIndex({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  console.log(data);

  return (
    <div>
      <h1>SuperHeroes</h1>
      <br />
      <div>
        {data?.map((elem) => {
          return (
            <div key={elem.id} className="ssr-body">
              <h3 className="paragraph">{elem.name}</h3>
              <div className="marvelChar-info">
                <p>{elem.alter_ego}</p>
                <div className="marvelChar-otherinfo">
                  {/* <Link href={`ssr/${elem.gender}`}>{elem.gender}</Link> */}
                  <Link href={`ssr/${elem.char_type}`}>{elem.char_type}</Link>
                </div>
              </div>
              <br />
            </div>
          );
        })}
      </div>

      <div className="ssr-body">
        <button className="button" onClick={() => router.push("/")}>
          Back to Home
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default SsrIndex;
