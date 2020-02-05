import React from 'react';
import ProductItem from './ProductItem';
import ProductSize from './ProductSize';
import CartItem from './CartItem';

class ProductLists extends React.Component {
  state = {
    products : [
      {
        'id' : 1,
        'name': 'Cat Tee Black T-shirt',
        'size': 'S',
        'price': 10.90,
        'image': 'https://via.placeholder.com/200x250.png?text=Product Image',
        'shipping': true
      },
      {
        'id' : 2,
        'name': 'Dark Thug Blue Navy T-shirt',
        'size': 'M',
        'price': 29.45,
        'image': 'https://via.placeholder.com/200x250.png?text=Product Image',
        'shipping': true
      },
      {
        'id' : 3,
        'name': 'Sphynx Tie Dye Wine T-shirt',
        'size': 'M',
        'price': 9.0,
        'image': 'https://via.placeholder.com/200x250.png?text=Product Image',
        'shipping': true
      },
      {
        'id' : 4,
        'name': 'Skuul',
        'size': 'L',
        'price': 14,
        'image': 'https://via.placeholder.com/200x250.png?text=Product Image',
        'shipping': true
      },
    ],
    filteredproducts : [],
    sizes: [ 'XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL' ],
    activesize: -1,
    menu: false,
    cart: []
  };

  componentDidMount() {
    this.setState({
      filteredproducts: this.state.products,
      cart:  sessionStorage.getItem("yeah").split(',')
    });
  }

  handleClickSize(e, size, index) {
    e.preventDefault();
    this.setState({
      activesize: index,
    })
    let filteredproducts = this.state.products.filter(item => {
        return item.size == size
    });
    this.setState({
      filteredproducts
    });
  }

  handleClickAddCart(e, id) {
    e.preventDefault();
    this.setState({
      cart: this.state.cart.concat(id)
    });
    sessionStorage.setItem("yeah", this.state.cart.concat(id));
  }

  handleClickRemoveItemCart(e, id) {
    e.preventDefault();
    let cart = this.state.cart.filter(item => { return(item != id) });
    this.setState({
      cart
    });
    sessionStorage.setItem("yeah", cart);
  }

  handleClickMenu(e) {
    e.preventDefault();
    this.setState({
      menu: !this.state.menu
    })
  }

  handleClickCloseMenu(e) {
    e.preventDefault();
    this.setState({
      menu: false
    })
  }

  onChangeSize(e) {
    let filteredproducts = (e.target.value == 'DESC') ?
     this.state.filteredproducts.sort((a, b) => b.price - a.price)
     :
     this.state.filteredproducts.sort((a, b) => a.price - b.price)
    ;
    this.setState({
      filteredproducts
    });
  }

  render() {
    console.log(this.state.menu);
    const { activesize, products, sizes, filteredproducts, cart, menu } = this.state;
    let sizes_html = sizes.map((item, index) => {
      return (
        <ProductSize
          onclick={(e) => this.handleClickSize(e, item, index)}
          classnames={activesize === index ? 'active' : ''}
          size={item}
          key={item} />
      );
    }, this);
    let product_html = (filteredproducts.length > 0) ?
      filteredproducts.map(item => {
        return (
          <ProductItem
            onclick={(e) => this.handleClickAddCart(e, item.id)}
            details={item}
            key={item.id} />
        );
      })
    : 'No Result';
    let cart_process = cart.map(cart => {
        return (
          products.find(item => cart == item.id )
        );
      });
    let cart_html = (cart_process.length) ?
        cart_process.map(item => {
            return (
              <CartItem
                onclick={(e) => this.handleClickRemoveItemCart(e, item.id)}
                details={item}
                key={item.id} />
            );
        }):'No item';
    let cart_total = (cart_process.length > 0) ?
        cart_process.reduce((a, b) => a + b.price,0):0;
    return(
      <React.Fragment>
        <div className="cart"><a href="#" onClick={(e)=>this.handleClickMenu(e)}>Cart ({cart.length})</a></div>
        <div className={ (menu) ? 'menu-container active' : 'menu-container' }>
          <a href="#" className="close" onClick={(e) => this.handleClickCloseMenu(e)}>Close</a>
          <div className="cartlist">
            { cart_html }
          </div>
          <p className="subtotal"> Subtotal: { cart_total } </p>
        </div>
        <div className="clearfix">
          <div className="filter-by-sizes">
            <strong>Sizes: </strong><br />
            { sizes_html }
          </div>
          <div className="product-area">
            <div className="clearfix">
              <div className="count"><p>{ filteredproducts.length } Products(s) Found</p></div>
              <div className="filter-by-price">
                <strong>Order by: </strong>
                <select onChange={(e) => this.onChangeSize(e)} defaultValue={'DEFAULT'}>
                  <option value="DEFAULT" disabled>Sort by Price</option>
                  <option value="ASC">Lowest - Highest</option>
                  <option value="DESC">Highest - Lowest</option>
                </select>
              </div>
            </div>
            <div className="product-list clearfix">
              {product_html}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ProductLists;
