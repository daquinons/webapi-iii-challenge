import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedUsersResponse = await axios.get(
          'http://localhost:4000/api/users'
        );
        setUsers(retrievedUsersResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users
        ? users.map(user => (
            <Link
              to={{ pathname: `/users/${user.id}`, state: { name: user.name } }}
            >
              <p key={user.id}>{user.name}</p>
            </Link>
          ))
        : undefined}
    </div>
  );
};

export default UsersList;
