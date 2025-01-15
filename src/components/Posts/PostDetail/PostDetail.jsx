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
  }, []);

  return (
    <div>
      <h1>PostDetail</h1>
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
            <p>{comment.body}</p>
          </>
        );
      })}
    </div>
  );
};

export default PostDetail;
