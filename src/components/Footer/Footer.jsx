import React from "react";
import './Footer.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-column align-items-center py-3 my-4">
        <ul className="nav justify-content-center list-unstyled d-flex">
          <li className="ms-3">
            <a href="#">
              <i className="bi bi-twitter"></i>
            </a>
          </li>
          <li className="ms-3">
            <a href="#">
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li className="ms-3">
            <a href="#">
              <i className="bi bi-facebook"></i>
            </a>
          </li>
        </ul>
        <span>&copy; 2025 Natural Wonder of the World</span>
      </footer>
    </div>
  );
};

export default Footer
