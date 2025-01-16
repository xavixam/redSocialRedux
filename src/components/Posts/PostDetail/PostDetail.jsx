import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getById, deletePost } from "../../../features/posts/postsSlice";
import { CommentOutlined, DeleteOutlined } from "@ant-design/icons";
import AddComment from "../../AddComment/AddComment";
import { Button } from "antd";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.posts);
  const { commentIds } = useSelector((state) => state.posts.post);
  const [show, setShow] = useState(false);
    const navigate = useNavigate();
  

  const isAuthor = (userId, postId) => {
    return userId === postId;
  };

  const delPost = () => {
    dispatch(deletePost(post._id))
    navigate("/")
  }

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>PostDetail</h1>
      {user && post && isAuthor(user._id, post.userId?._id) ? (
        <Button danger onClick={() => delPost()}>
          Delete Post
          <DeleteOutlined />
        </Button>
      ) : null}
      <p>{post.title}</p>
      <p>{post.body}</p>
      <Button danger onClick={() => delPost()}></Button>
      <div>
        <button onClick={() => setShow(true)}>
          New Comment <CommentOutlined />
        </button>
          Delete Post
          <DeleteOutlined />
      </div>
      <h3>Comments</h3>
      {show ? <AddComment /> : null}
      {commentIds?.map((comment) => {
        return (
          <>
            <p>
              {comment.body}
              {user && comment && isAuthor(user._id, comment.userId) ? ( // Asegúrate de usar la propiedad correcta
                  <Button danger>
                    Delete Comment
                    <DeleteOutlined />
                  </Button>
                ) : null}
            </p>
          </>
        );
      })}
    </div>
  );
};

export default PostDetail;