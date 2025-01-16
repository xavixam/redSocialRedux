import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../../features/posts/postsSlice";
import { CommentOutlined } from "@ant-design/icons";
import AddComment from "../../AddComment/AddComment";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const { commentIds } = useSelector((state) => state.posts.post);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  return (
    <div className="post-detail-container">
      <div className="post-detail">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-body">{post.body}</p>
        <div className="comment-section">
          <button
            className="show-comment-btn"
            onClick={() => setShow(true)}
          >
            New Comment <CommentOutlined />
          </button>
          {show && <AddComment />}
        </div>
        <h3 className="comments-heading">Comments</h3>

        <div className="comments-container">
          {commentIds?.map((comment) => (
            <div key={comment.id} className="comment-card">
              <p className="comment-body">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;