
import React, { Component } from "react";
import './App.css';
import CartItems from './components/CartItems';
import CartHeader from './components/CartHeader';
import CartFooter from './components/CartFooter';



class App extends Component {
  state = {
    products:
      [

      ],
    cartItemList:
      [
        {id: 0, product:{}, quantity: 0}
      ]
  }

  async componentDidMount() {
    const productsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
    const productsJson = await productsResponse.json();
    const itemsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/items`);
    const itemsJson = await itemsResponse.json();
    this.setState({
      ...this.state,
      products: productsJson,
    });
    

    itemsJson.map((item, i) => {
      item.key = i;
      item.product = productsJson.find(
        (product) => product.id === item.product_id
      );
    });

    this.setState({
      ...this.state,
      cartItemList: itemsJson,
    });

  }

  total = 0;

  getTotal = (cart) => {
    /* const total = cart.reduce((pv, cv) => { 
        pv += (parseInt(cv.product.priceInCents) * parseInt(cv.quantity))
          }, 0);*/
    var sum = 0;
    for (var i = 0; i < cart.length; i++) {
      sum += parseInt(cart[i].product.priceInCents) * parseInt(cart[i].quantity)

    }

    this.total = sum;

  }

  addItemToList = async (product) => {
    

    const fetchProduct = {
      product_id: product.product.id,
      quantity: product.quantity,
      id: product.product.id
    }

   const response = await fetch("http://localhost:8082/api/items", {
      method:'POST',
      body: JSON.stringify(fetchProduct),
      
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState({
      cartItemList: [...this.state.cartItemList, product]
    })

  }

  render() {
    return (
      <div>
        <CartHeader />
        <CartItems products={this.state} addItemToList={this.addItemToList} total={this.total} />
        <CartFooter copyright="2016" />

      </div>
    )
  };


}

export default App;
