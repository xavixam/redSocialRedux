import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../features/auth/authSlice"
import './Header.scss';
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons"

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const onLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm("");
    }
  };
  return (
    <>
      <div className="header">
        <div className="container">
        <header className="d-flex justify-content-between align-items-center py-3">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              {user ? (
                <>
                <li className="nav-item">
                    <Link to={"/profile/" + user._id} className="nav-link">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={onLogout}>
                      Logout <LogoutOutlined />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login <LoginOutlined />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </header>
        </div>
      </div>
    </>
  );
  };

export default Header
