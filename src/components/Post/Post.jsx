import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Post.scss'; 
import img from '../../assets/img.png';

const Post = () => {
  const { posts } = useSelector((state) => state.posts);

  const post = posts.map((post) => {
    return (
      <div className="post-card" key={post._id}>
        <Link to={"/post/" + post._id} className="post-link">
         <img
                src={img}
                alt="img"
                style={{ width: '100%', height: 'auto' }}
              />
          <div className="post-title">{post.title}</div>
        </Link>
      </div>
    );
  });

  return <div className="posts-container">{post}</div>;
};

export default Post;