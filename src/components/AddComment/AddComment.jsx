import React, { useState } from "react";
import { createComment, getById } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './AddComment.scss';

const AddComment = () => {
  const initialValue = {
    body: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const { post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { body } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (body === "") {
      alert("Rellena los campos");
    } else {
      console.log("creado");
      await dispatch(createComment({ formData, _id: post._id }));
      setFormData(initialValue);
      console.log("creado2");
      return dispatch(getById(post._id)); 
    }
  };

  return (
    <div className="add-comment-container">
      <div className="add-comment-card">
        <h2 className="comment-form-title">Add a Comment</h2>
        <form onSubmit={onSubmit} className="comment-form">
          <input
            type="text"
            name="body"
            value={body}
            onChange={onChange}
            placeholder="New Comment..."
            className="comment-input"
          />
          <button type="submit" className="comment-submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComment;