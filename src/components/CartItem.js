import React from 'react';

const CartItem = ({details, onclick}) => {
  const { name, price, size, image } = details;
  return (
    <div className="cart-item clearfix">
      <div className="cart-image"><img src={image} /></div>
      <div className="cart-info">
        <div className="cart-name">{name}</div>
        <div className="cart-price">{price}</div>
        <div className="cart-size">{size}</div>
        <button onClick={onclick}>x</button>
      </div>
    </div>
  )
}

export default CartItem;
