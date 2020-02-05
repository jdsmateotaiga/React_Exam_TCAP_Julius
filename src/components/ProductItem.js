import React from 'react';

const ProductItem = ({details, onclick}) => {
  const { name, price, size, image, shipping } = details;
  let shipping_html = (shipping) ? <div className="shipping">Free Shipping</div> : '';
  return (
    <div className="product-item">
      { shipping_html }
      <div className="product-image">
        <img src={ image } alt={ name } />
      </div>
      <p className="product-name">{ name }</p>
      <p className="product-price">$ { price }</p>
      <p className="product-variation">{ size }</p>
      <button onClick={onclick}>Add to cart</button>
    </div>
  )
}

export default ProductItem;
