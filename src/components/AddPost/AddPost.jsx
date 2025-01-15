import React, { useState } from "react"
import { createPost } from "../../features/posts/postsSlice"
import { useDispatch } from "react-redux"
import { notification } from "antd"
import { useNavigate } from "react-router-dom"
import './AddPost.scss'

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
          return navigate("/");
        }
      };
    
      return (
        <div className="addpost-container">
          <h2 className="addpost-title">Crear Nueva Publicación</h2>
          <form className="addpost-form" onSubmit={onSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Título"
              className="addpost-input"
            />
            <textarea
              name="body"
              value={body}
              onChange={onChange}
              placeholder="Contenido"
              className="addpost-textarea"
            />
            <button type="submit" className="addpost-button">
              Publicar
            </button>
          </form>
        </div>
      );
    };
    
    export default AddPost