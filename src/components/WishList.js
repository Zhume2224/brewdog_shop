import React from 'react';
import BeerInfo from './BeerInfo';
import {Link} from "react-router-dom"
//this is related to basket. 

const WishList = ({ selectedBeers, removeBeer, showMore }) => {
  return (
    <>
      <h2>Basket:</h2>
      <Link to="/checkout">Check Out</Link>
      {selectedBeers.map((beer) => (
        <div key={beer.id} id={beer.id}>
          <h3>{beer.name}</h3>
          <p>ABV{beer.abv}%</p>
          <img src={beer.image_url} alt={beer.name} style={{ width: '200px', height: '300px' }} />
          <button onClick={() => removeBeer(beer.id)}>Remove</button>
          <button className="beer-info" onClick={() => showMore(beer.id)}>
            {beer.showInfo ? 'Hide Info' : 'More Info'}
          </button>
          {beer.showInfo && <BeerInfo beer={beer}/>}
          

        </div>
      ))}
    </>
  );
};


export default WishList;

{/* <div key={Date.now()} id={Date.now()}> */}


