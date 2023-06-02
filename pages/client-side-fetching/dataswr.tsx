import { UserDto } from "@/dto/client-side-fetch-Dto/userDto";
import useSWR from "swr";

const fetcher = async () => {
  const res = await fetch(
    "https://63e4f4ce8e1ed4ccf6ea0b09.mockapi.io/api/users"
  );
  const users = (await res.json()) as UserDto[] | string;
  return users;
};

const DataFetchingSWR = () => {
  const { data, error } = useSWR("userListSWR", fetcher);

  if (error || data === "Not found") {
    console.log(error);
    return <h4>An Err has occured</h4>;
  }

  if (!data) {
    return <h4>Loading...</h4>;
  }

  if (data) {
    return <div>Data fetched using SWR...!</div>;
  }
};

export default DataFetchingSWR;
