import React from 'react'
import Posts from '../Posts/Posts'
import './Home.scss'
import logo from '../../assets/paisaje-invernal.avif'

const Home = () => {
  return (
    <div className="home">
      <div className="text-container d-flex align-items-center justify-content-start mt-3">
          <h1 className="titulo me-3">'Natural Wonder of the World'</h1>
        </div>
      <div className="content-container d-flex flex-column align-items-center mt-4">
        <img
          src={logo}
          alt="Logo de la Red Social"
          className="logo"
        /><p>
        "Natural Wonder of the World" is an extraordinary guide that showcases Earth's most breathtaking natural treasures. Combining landscape photography, 3D terrain models, and explanatory artworks, the book reveals the formation of geological features and the life within these environments. It highlights the plants and animals inhabiting these areas, offering a visual celebration of the planet's natural beauty. 
      </p>
      </div>
      <Posts />
    </div>
  );
};

export default Home
