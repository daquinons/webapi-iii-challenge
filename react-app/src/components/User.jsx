import React from 'react';
import axios from 'axios';

const User = props => {
  const userId = props.match.params.id;

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedPostsResponse = await axios.get(
          `http://localhost:4000/api/users/${userId}/posts`
        );
        setPosts(retrievedPostsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h2>Posts created by {props.location.state.name}:</h2>
      {posts.map(post => {
        return <p key={post.id}>{post.text}</p>;
      })}
    </div>
  );
};

export default User;
