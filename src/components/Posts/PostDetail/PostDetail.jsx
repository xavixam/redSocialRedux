import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getById,
  deletePost,
  deleteComment,
} from "../../../features/posts/postsSlice";
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
    dispatch(deletePost(post._id));
    navigate("/");
  };

  const delComment = (id) => {
    dispatch(deleteComment(id));
    navigate("/");
  };

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className="post-detail-container">
        <div className="post-detail">
          {user && post && isAuthor(user._id, post.userId?._id) ? (
            <Button danger onClick={() => delPost()}>
              Delete Post
              <DeleteOutlined />
            </Button>
          ) : null}
          <h1 className="post-title">{post.title}</h1>
          <p className="post-body">{post.body}</p>
          <div className="comment-section">
            <button
              className="show-comment-btn"
              onClick={() => setShow(true)}
            >
              New Comment <CommentOutlined />
            </button>
          </div>
          <h3 className="comments-heading">Comments</h3>
          {show ? <AddComment /> : null}
          <div className="comments-container">

          </div>
          {commentIds?.map((comment) => {
            return (
              <>
                <div key={comment.id} className="comment-card">
                  <p className="comment-body">{comment.body}</p>
                  {user && comment && isAuthor(user._id, comment.userId) ? (
                    <Button danger onClick={() => delPost(comment._id)}>
                      Delete Comment
                      <DeleteOutlined />
                    </Button>
                  ) : null}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;