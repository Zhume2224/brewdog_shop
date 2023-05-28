import React from 'react';
import BeerInfo from './BeerInfo';

const WishList = ({ selectedBeers, removeBeer, showMore }) => {
  return (
    <>
      <h2>Basket:</h2>
      {selectedBeers.map((beer) => (
        <div key={beer.id} id={beer.id}>
          <h3>{beer.name}</h3>
          <p>ABV{beer.abv}%</p>
          <img src={beer.image_url} alt={beer.name} style={{ width: '200px', height: '300px' }} />
          <button onClick={() => removeBeer(beer.id)}>Remove</button>
          <button className="beer-info" onClick={() => showMore(beer.id)}>
            {beer.showInfo ? 'Hide Info' : 'More Info'}
          </button>
          {beer.showInfo && <BeerInfo beer={beer} showInfo={beer.showInfo} />}
        </div>
      ))}
    </>
  );
};


export default WishList;




{/* //<ul> */}
{/* // {filteredBeers */}
{/* //   .filter((beer) => savedBeerIds.includes(beer.id))
//   .map((beer) => (
//     <li key={beer.id} id={beer.id}>
//       {beer.name}
//       <img src={beer.image_url} alt={beer.name} style={{ width: '200px', height: '300px' }} />
//       <button onClick={() => removeBeer(beer.id)}>Remove</button>
//       <button className="beer-info" onClick={showMore}>
// {showInfo ? 'Hide Info' : 'More Info'}
// </button>

//      {showInfo && <BeerInfo beer={beer} showInfo={showInfo} />}
//     </li>
// </ul>
//   ))} */}