import { useEffect, useState } from "react";
import "./App.css";
import { NotOk, User } from "./@types";
import { baseURL } from "./utils/baseURL";

function App() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch(`${baseURL}/api/users/all`);
        if (response.ok) {
          const result = (await response.json()) as User[];
          console.log(result);
          setUsers(result);
        } else {
          const result = (await response.json()) as NotOk;
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  return (
    <>
      <h1>ALL USERS!!!</h1>
      {users &&
        users.map((user) => {
          return <div key={user._id}>{user.email}</div>;
        })}
    </>
  );
}

export default App;
