import React, { Component } from 'react';
import AddItem from './AddItem';
import CartItemComponent from './CartItemComponent';

class CartItems extends Component {

    

    state = {}


    render() {
        return (
            <div className="container">
                <h1>Cart Items</h1>
                <div className="list-group">
                    <div className="list-group-item">
                        <div className="row">
                            <div className="col-md-8">Product</div>
                            <div className="col-md-2">Price</div>
                            <div className="col-md-2">Quantity</div>
                        </div>
                    </div>
                    {this.props.products.cartItemList.map(product => <CartItemComponent key={product.id} product={product} />)}

                </div>

                <div>
                    
                    <AddItem products={this.props.products.products} 
                    cartItemList={this.props.products.cartItemList}
                    addItemToList={this.props.addItemToList}
                    addProduct={this.addProduct} />

                </div>

            </div>
        );
    }

}






export default CartItems;