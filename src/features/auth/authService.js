import axios from "axios"

const API_URL = "http://localhost:8080/users"

const register = async (user) => {
  const res = await axios.post(API_URL + "/create", user)
  return res.data; //payload
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "/login", userData)
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data.user))
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

const logout = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(API_URL + "/logout", {
    headers: {
      authorization: token,
    },
  });

  if (res.data) {
    localStorage.clear();
  }

  return res.data;
};

const authService = {
  register,
  login, 
  logout
};

export default authService