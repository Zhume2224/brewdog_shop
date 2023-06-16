import React from 'react';

const BeerInfo = ({ beer }) => {
  return (
    <>

        <div key={beer.id} id={beer.id}>
          <h3>Description:</h3>
          <p>{beer.description}</p>
          <h3>Food Pairing:</h3>
          <p>{beer.food_pairing.join(', ')}</p>  
          </div>   
    </>
  );
};

export default BeerInfo;
