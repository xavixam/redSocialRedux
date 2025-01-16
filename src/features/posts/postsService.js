import axios from "axios";

const API_URL = "http://localhost:8080/posts";

const getAll = async () => {
  const res = await axios.get(API_URL + "/");
  return res.data;
};

const getById = async (id) => {
  const res = await axios.get(API_URL + "/id/" + id);
  return res.data;
};

const getPostByName = async (title) => {
  const res = await axios.get(API_URL + "/getByName/" + title);
  return res.data;
};

const createPost = async (post) => {
  const token = localStorage.getItem("token") || "";

  const res = await axios.post(API_URL + "/create", post, {
    headers: {
      authorization: token,
    },
  });
  return res.data; //payload
};

const deletePost = async (id) => {
  const token = localStorage.getItem("token") || "";

  const res = await axios.delete(API_URL + "/id/" + id, {
    headers: {
      authorization: token,
    },
  });
  return res.data; //payload
};

const getUserPosts = async (id) => {
  const res = await axios.get(API_URL + "/getUserPosts/" + id);
  return res.data;
};

const likePost = async (postId) => {
  const token = localStorage.getItem("token") || "";

  const res = await axios.put(
    `${API_URL}/like/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const unlikePost = async (postId) => {
  const token = localStorage.getItem("token") || "";

  const res = await axios.put(
    `${API_URL}/unlike/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
}

const createComment = async (comment) => {
  const token = localStorage.getItem("token") || "";

  const res = await axios.post("http://localhost:8080/comments/create/" + comment._id, comment.formData,  
    {headers: {
      authorization: token,
  }});
  return res.data; //payload
};

const deleteComment = async (id) => {
  const token = localStorage.getItem("token") || "";

  const res = await axios.delete("http://localhost:8080/comments/id/" + id, {
    headers: {
      authorization: token,
    },
  });
  return res.data; //payload
};

const postsService = {
  getAll,
  getById,
  getPostByName,
  createPost,
  deletePost,
  getUserPosts,
  likePost,
  unlikePost, 
  createComment,
  deleteComment
};

export default postsService
