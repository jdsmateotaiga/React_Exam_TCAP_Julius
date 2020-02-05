import React from 'react';

const ProductSize = ({size, onclick, classnames}) => {
  return (
    <button
      href={'#'+size}
      onClick={onclick}
      className={classnames}>
      {size}
    </button>
  )
}

export default ProductSize;
