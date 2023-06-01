import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { marvelCharacters } from ".";
import { useRouter } from "next/router";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const marvelCharUrl = "https://6371fb0e025414c63702d396.mockapi.io/react_query";

interface parameter extends Params {
  category: string;
}

export const getServerSideProps: GetServerSideProps<
  {
    dynamicData: marvelCharacters[];
  },
  parameter
> = async (context) => {
  const { params } = context;
  //   const type = params?.category;

  const res = await fetch(`${marvelCharUrl}?char_type=${params?.category}`);
  const dynamicData = await res.json();
  return { props: { dynamicData } };
};

function Category({
  dynamicData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const char_type = router.query.category;

  console.log(dynamicData, char_type);

  return (
    <div>
      <h3>
        Showing result for <span className="highlight-text">{char_type}</span>{" "}
        type characters
      </h3>
      {dynamicData?.map((elem) => {
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

export default Category;
