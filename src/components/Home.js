import React from "react";
import './Home.css';
import WishList from "./WishList";
import { Link } from "react-router-dom";

const Home = ( {selectedBeers, removeBeer}) => {
  return (
    <div className="homePage">
      <div className="surpriseMe">
        <h2>Surprise Me</h2>
        <button >
          <Link className="anybeer" to="/randomBeer">💟</Link>
        </button>
      </div>
      <div className="helpMe">
        <h2>Help Me</h2>
        <button className="filterbeer">
        <Link to="/help">💟</Link>
        </button>
      </div>
      {/* <WishList selectedBeers={selectedBeers} removeBeer={removeBeer} />  */}
    </div>
  );
}

export default Home;
