import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { marvelCharacters } from ".";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const marvelCharUrl = "https://6371fb0e025414c63702d396.mockapi.io/react_query";

type SsrPropsData = {
  dynamicData: marvelCharacters[];
  query: ParsedUrlQuery;
};

// server side props -----------------------------------------------------------
export const getServerSideProps: GetServerSideProps<{
  data: SsrPropsData;
}> = async (context) => {
  const { query, res } = context;

  res.setHeader("Set-Cookie", ["user=dev"]);

  const response = await fetch(`${marvelCharUrl}?char_type=${query?.category}`);
  const dynamicData = await response.json();
  return { props: { data: { dynamicData, query } } };
};

// ui component ----------------------------------------------------------------
function CategoryPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { dynamicData: dt, query } = data;

  return (
    <div>
      <h3>
        Showing result for
        <span className="highlight-text">{query.category}</span> type characters
      </h3>
      {dt?.map((elem) => {
        return (
          <div key={elem.id} className="ssr-body">
            <h3 className="paragraph">{elem.name}</h3>
            <div className="marvelChar-info">
              <p>{elem.alter_ego}</p>
              <p>{elem.char_type}</p>
            </div>
            <br />
          </div>
        );
      })}
      <div className="ssr-body">
        <button className="button" onClick={() => router.back()}>
          Back to Characters
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default CategoryPage;
