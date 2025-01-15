import React, { useState } from "react";
import { createComment, getById } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      return dispatch(getById(post._id)); // redireccionamos a home
    }
  };

  return (
    <form>
      <input
        type="text"
        name="body"
        value={body}
        onChange={onChange}
        placeholder="New Comment..."
      />
      <button type="submit" onClick={onSubmit}>
        Register
      </button>
    </form>
  );
};

export default AddComment;
