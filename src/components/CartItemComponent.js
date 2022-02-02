import React from "react";
import CartItems from "./CartItems";

const priceToDollar = (cents) => `$${cents / 100}`

const CartItemComponent = ({product}) => (
    <div className="list-group-item">
        <div className="row">
            <div className="col-md-8">{product.product.name}</div>
            <div className="col-md-2">{priceToDollar(product.product.priceInCents)}</div>
            <div className="col-md-2">{product.quantity}</div>
        </div>
    </div>

)

export default CartItemComponent;