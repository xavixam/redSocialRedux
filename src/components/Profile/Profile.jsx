import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.scss'; 

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="profile-container">
      <div className="profile-header">Profile</div>
      <div className="profile-card">
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
