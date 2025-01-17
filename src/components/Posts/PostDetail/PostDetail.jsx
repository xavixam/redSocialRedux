import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getById, deletePost, deleteComment } from "../../../features/posts/postsSlice";
import { CommentOutlined, DeleteOutlined } from "@ant-design/icons";
import AddComment from "../../AddComment/AddComment";
import { Button } from "antd";
import "./PostDetail.scss"; //

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
    dispatch(deletePost(post._id));
    navigate("/");
  };

  const delComment = async (id) => {
    await dispatch(deleteComment(id));
    dispatch(getById(id));
  };

  useEffect(() => {
    dispatch(getById(id));
  }, [id, dispatch]);

  return (
    <div className="post-detail-container">
      <div className="post-detail">
        {user && post && isAuthor(user._id, post.userId?._id) ? (
          <Button danger className="delete-post-btn" onClick={delPost}>
            Delete Post <DeleteOutlined />
          </Button>
        ) : null}

        <h1 className="post-title">{post?.title}</h1>
        <p className="post-body">{post?.body}</p>

        <div className="comment-section">
          <button className="show-comment-btn" onClick={() => setShow(true)}>
            New Comment <CommentOutlined />
          </button>
        </div>

        {show && <AddComment postId={post._id} />}

        <h3 className="comments-heading">Comments</h3>
        <div className="comments-container">
          {commentIds?.map((comment) => (
            <div key={comment._id} className="comment-card">
              <p className="comment-body">{comment.body}</p>
              {user && comment && isAuthor(user._id, comment.userId) ? (
                <button
                  className="delete-comment-btn"
                  onClick={() => delComment(comment._id)}
                >
                  <DeleteOutlined /> Delete
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
