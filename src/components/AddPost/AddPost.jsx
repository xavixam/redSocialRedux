import React, { useState } from "react";
import { createPost } from "../../features/posts/postsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const initialValue = {
        title: "",
        body: "",
      };
    
      const [formData, setFormData] = useState(initialValue);
    
      const { title, body } = formData;
      const dispatch = useDispatch();
      const navigate = useNavigate();
    
      const onChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
        if (title === "" || body === "") {
          alert("Rellena los campos")
        } else {
          dispatch(createPost(formData));
          return navigate("/"); // redireccionamos a home
        }
      };
    
      return (
        <form>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Title"
          />
          <textarea
            name="body"
            value={body}
            onChange={onChange}
            placeholder="Body"
          />
          <button type="submit" onClick={onSubmit}>Register</button>
        </form>
)}

export default AddPost