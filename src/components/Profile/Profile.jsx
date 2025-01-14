import './Profile.scss'; 
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserPosts } from "../../features/posts/postsSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { userPost } = useSelector((state) => state.posts);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts(id));
  }, []);

  return (
    <>
      <div className="profile-container">
      <div className="profile-header">Profile</div>
      <div className="profile-card">
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
      <div>
        <h2>User's posts</h2>
        {userPost.map((posts) => {
          return (
            <>
              <Link to={"/post/" + posts._id}>
                <p>{posts.title}</p>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
