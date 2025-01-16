import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../../features/posts/postsSlice";
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

  const isAuthor = (userId, postId) => {
    return userId === postId;
  };

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  return (
    <div>
      <h1>PostDetail</h1>
      {user && post && isAuthor(user._id, post.userId?._id) ? (
        <Button danger>
          Delete Post
          <DeleteOutlined />
        </Button>
      ) : null}
      <p>{post.title}</p>
      <p>{post.body}</p>
      <div>
        <button onClick={() => setShow(true)}>
          New Comment <CommentOutlined />
        </button>
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
