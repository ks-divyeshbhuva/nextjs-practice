import { useEffect, useState } from "react";
import { UserDto } from "../../dto/client-side-fetch-Dto/userDto";

const ClientSideFetching = () => {
  const [userList, setUserList] = useState<null | UserDto[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserList = async () => {
      const res = await fetch(
        "https://63e4f4ce8e1ed4ccf6ea0b09.mockapi.io/api/users"
      );
      const users = (await res.json()) as UserDto[];

      const usersData = users.map(({ id, name, email, avatar }) => {
        return {
          id,
          name,
          email,
          avatar,
        };
      });
      setUserList(usersData);
      setIsLoading(false);
    };
    fetchUserList();
  }, []);

  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  return <div>Data fetched...!</div>;
};

export default ClientSideFetching;
