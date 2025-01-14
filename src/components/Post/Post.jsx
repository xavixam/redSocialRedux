import './Post.scss'; 
import img from '../../assets/img.png';
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons"

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      navigate("/search/"+text)
    }
  };


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
  
  return (
    <>
      <input onKeyUp={handleChange} placeholder="search post" name="text" />
      <button onClick={()=>navigate("/search/"+text)}><SearchOutlined /></button>
      <button onClick={()=>navigate("/addPost")}>New Post <PlusCircleOutlined /></button>
      <div>{post}</div>
    </>
  )
};
  
export default Post;
  
