import { useState, useEffect } from "react";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => setUsers(res.data.map((user) => user.name)))
        .catch(() => setError("Error fetching users"));
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Users</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};
