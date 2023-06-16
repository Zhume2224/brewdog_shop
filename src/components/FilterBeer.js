import React, { useState } from 'react';
// import Buttons from './Buttons';
import BeerInfo from './BeerInfo';

const FilterBeer = ({showFilteredBeer,saveRandom, allBeers, handleInput, filteredBeers, showMore, showInfo, saveSelected, isSaved, beer }) => {
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
                <p>Price:£{beer.price}</p>
                <br/>
                <img src={beer.image_url} alt={beer.name} style={{ width: '200px', height: '300px' }} />
                {/* fixing buttons */}
                <button className="info" onClick={() => showFilteredBeer(beer.id)}> {beer.showInfo ? 'Hide Info' : 'More Info'}
          </button>
                <button className="beer-save" onClick={()=>{saveSelected(beer.id)}}> {isSaved ? 'Saved' : 'Save'}
            </button>
                 {beer.showInfo && <BeerInfo beer={beer} />}
            
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FilterBeer;