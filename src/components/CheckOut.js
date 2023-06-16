import React, { useState } from 'react';

const CheckOut = ({ selectedBeers, getTotalPrice }) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(getTotalPrice(null));
  //to add:voucher update state.

  const handleChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const applyVoucher = () => {
    const totalPrice = getTotalPrice(voucherCode || null); 
    setTotalPrice(totalPrice); 
  };

  return (
    <>
      <div>
        Ordered Items:
        {selectedBeers.map((beer) => {
          return <li className='price-list' key={beer.id}>{beer.name}: £{beer.price}</li>;
        })}
        Any Voucher? (current code1: BREW15; code2: BREW50;)
        <input
          type="text"
          placeholder="enter discount code"
          value={voucherCode}
          onChange={handleChange}
        />
        <button onClick={applyVoucher}>Apply</button>
        Total Price: {totalPrice} 
      </div>
    </>
  );
};

export default CheckOut;
