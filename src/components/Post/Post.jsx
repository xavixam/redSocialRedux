import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, PlusCircleOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import { likePost, unlikePost } from "../../features/posts/postsSlice"; 
import './Post.scss';
import img from '../../assets/img.png';

const Post = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      navigate("/search/" + text);
    }
  };

  const handleLike = (postId, isLiked) => {
    if (isLiked) {
      dispatch(unlikePost(postId));
    } else {
      dispatch(likePost(postId));
    }
  };

  const postList = posts.map((post) => {
    const isLiked = post.likes && post.likes.includes(localStorage.getItem("userId")); 

    return (
      <div className="post-card" key={post._id}>
        <Link to={"/post/" + post._id} className="post-link">
          <img src={img} alt="img" style={{ width: '100%', height: 'auto' }} />
          <div className="post-title">{post.title}</div>
        </Link>

        <button 
          className="like-btn" 
          onClick={() => handleLike(post._id, isLiked)} 
          disabled={isLoading}
        >
          {isLiked ? <LikeFilled style={{ color: 'red' }} /> : <LikeOutlined />} {post.likes?.length || 0}
        </button>
      </div>
    );
  });

  return (
    <>
      <div className="search-container">
        <input 
          onKeyUp={handleChange} 
          placeholder="search post" 
          name="text" 
          className="search-bar"
        />
        <button onClick={() => navigate("/search/" + text)} className="search-button">
          <SearchOutlined />
        </button>
      </div>
  
      <button onClick={() => navigate("/addPost")}>
        New Post <PlusCircleOutlined />
      </button>
      
      <div className="posts-container">{postList}</div>
    </>
    );
  };

  export default Post;