import React from 'react';
import BeerInfo from './BeerInfo';

const BeerRandom = ({ beer, getBeer, saveRandom, showInfo, isSaved, selectedBeers }) => {
  return (
    <>
      {beer && (
        <>
          <div className="main-container">
            <button className="beer-select" onClick={getBeer}>
              Any Beer
            </button>
            <button className="beer-save" onClick={saveRandom}>
              {isSaved ? 'Saved' : 'Save'}
            </button>
            
          </div>
          <div>
            <p>Name:{beer.name}</p>
            <p>Price:£{beer.price}</p>
            <img src={beer.image_url} alt={beer.name} style={{ width: '200px', height: '300px' }} />
            <p>Description:{beer.description}</p>
            <p>Food Pairing:{beer.food_pairing.join(",")}</p>

          </div>
          {showInfo && <BeerInfo beer={beer} showInfo={showInfo} />}
        </>
      )}
    </>
  );
};

export default BeerRandom;
