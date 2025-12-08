import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [users, setUsers] = useState<{ id: number; email: string; createdAt: string; }[]>([]);

  useEffect(() => {
    const getAllUser = async () => {
      const { data } = await api.post("/manager");
      setUsers(data);
      console.log("dashboard: ", data);
    };
    getAllUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.email} - {user.createdAt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}