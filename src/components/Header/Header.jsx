import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="container">
          <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              {/* {token ? (
                <>
                  <li className="nav-item" onClick={logoutUser}>
                    <Link to="/logout" className="nav-link">
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <> */}
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                {/* </>
              )} */}
            </ul>
          </header>
        </div>
      </div>
    </>
  )
}

export default Header