import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons"

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
          <div className="post" key={post._id}>
            <Link to={"/post/" + post._id}>
              <p>{post.title}</p>
            </Link>
          </div>
        );
      });
    
    return (
      <>
        <input onKeyUp={handleChange} placeholder="search post" name="text" />
        <button><SearchOutlined /></button>
        <div>{post}</div>
      </>
    )
  };
  
  export default Post;
  