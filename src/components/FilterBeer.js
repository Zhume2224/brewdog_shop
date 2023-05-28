import React, { useState } from 'react';
import Buttons from './Buttons';
import BeerInfo from './BeerInfo';

const FilterBeer = ({ allBeers, handleInput, filteredBeers, showMore, showInfo, saveSelected, isSaved, beer }) => {
  const [food, setFood] = useState('');

  const handleChange = (e) => {
    setFood(e.target.value);
  };

  const handleClick = () => {
    handleInput(food);
  };

  return (
    <>
      <label htmlFor="meal-input">By meal:</label>
      <input type="text" id={Date.now()}  placeholder="What are you having?" onChange={handleChange} />
      <button onClick={handleClick}>Check</button>

      {filteredBeers.length > 0 && (
        <>
          <h2>Filtered Beers:</h2>
          <ul>
            {filteredBeers.map((beer) => (
              <li key={beer.id} id={beer.id}>
                {beer.name}
                Price£:{beer.price}
                <img src={beer.image_url} alt={beer.name} style={{ width: '200px', height: '300px' }} />
                <Buttons showMore={()=>{showMore(beer.id)}} saveSelected={()=>saveSelected(beer.id)} showInfo={showInfo} isSaved={isSaved} />
                {showInfo && <BeerInfo beer={beer} showInfo={showInfo} />}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FilterBeer;