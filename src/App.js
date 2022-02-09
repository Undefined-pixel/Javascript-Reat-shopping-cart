
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
        
      ]
  }

  async componentDidMount(){
    const productsResponse = await fetch("http://localhost:8082/api/products");
    const productsJson = await productsResponse.json()
    const itemsResponse = await fetch("http://localhost:8082/api/items")
    const itemsJson = await itemsResponse.json()
    this.setState({
      ...this.state,
      products: productsJson
    })
    console.log(productsJson)
    console.log(itemsJson)

 
   
    

   const mappedItems =  itemsJson.map(item =>  {
    Object.create(
    ...item, 
    product: productsJson.find(product => product.id === item.product_id))
    });

    console.log(mappedItems)

   this.setState({
     ...this.state,
     cartItemList: mappedItems
   })
   

  }

 total = 0;

  getTotal = (cart) => {
    /* const total = cart.reduce((pv, cv) => { 
        pv += (parseInt(cv.product.priceInCents) * parseInt(cv.quantity))
          }, 0);*/
      var sum = 0;
      for(var i = 0; i < cart.length; i++){
        sum += parseInt(cart[i].product.priceInCents) * parseInt(cart[i].quantity)
        
      }

       this.total = sum;

  }

  addItemToList = (product) => {
      console.log("i have received", product)
      var check = this.state.cartItemList.some(item => item.product.name == product.product.name)
      
      if(check){
        var newList = this.state.cartItemList
        newList.map(item =>  {
          if(product.product.name == item.product.name){
            console.log("i am true")

           var newQuantity = parseInt(item.quantity) + parseInt(product.quantity)
           item.quantity = newQuantity
            
          } 
        });
        this.setState(prevState => ({cartItemList: prevState.cartItemList = newList})) 

      }else{
        this.setState(prevState => ({cartItemList: prevState.cartItemList.concat(product)}))
      }

    this.getTotal(this.state.cartItemList);
 }

  render() {
    return (
      <div>
        <CartHeader />
        <CartItems products={this.state} addItemToList={this.addItemToList} total={this.total}/>
        <CartFooter copyright="2016" />

      </div>
    )
  };


}

export default App;
