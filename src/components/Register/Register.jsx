import React, { useState } from "react"
import { register } from "../../features/auth/authSlice"
import { useDispatch } from "react-redux"
import { notification } from "antd"
import { useNavigate } from "react-router-dom"
import './Register.scss'

const Register = () => {

  const initialValue = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const [formData, setFormData] = useState(initialValue);

  const { name, email, password, password2 } = formData;
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
    if (password !== password2) {
      return notification.error({
        message: "Error",
        description: "Passwords do not match",
      });
    } else {
      dispatch(register(formData));
      setFormData(initialValue); 
      return navigate("/"); 
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={onChange}
          placeholder="Password 2"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register
