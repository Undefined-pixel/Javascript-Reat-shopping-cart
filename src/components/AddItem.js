import React, { Component } from "react";


export default class AddItem extends React.Component {

    state = {currentProduct:{}, currentQuantity: 0}

    getObject = (e) => {
        e.preventDefault();
        console.log("My value is", e.target.value)
        const tempObject = JSON.parse(e.target.value)
        this.setState({
            currentProduct: tempObject  
        })
        

    }

    getQuantity = async(e) =>{
        e.preventDefault();
        await this.setState({[e.target.name] : e.target.value}) 
        console.log(this.state.currentQuantity)
        
    };

    addProduct = (e) => {
        e.preventDefault();
        var tempProduct = {
            
            product: this.state.currentProduct,
            quantity: this.state.currentQuantity
        }
        console.log("im about to submit", tempProduct)
        this.props.addItemToList(tempProduct)  
    }

    render() {
        return (

            <form>
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input className="form-control" onChange={this.getQuantity} name="currentQuantity"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Products</label>
                    <select className="form-select" aria-label="Default select example" onChange={this.getObject} name="currentProduct">
                    <option value="" disabled selected hidden>Choose a product...</option>
                        {this.props.products.map( product => <option value={JSON.stringify(product)}>{product.name}</option>)}

                    </select>
                    <button className="btn btn-primary" onClick={this.addProduct}>Submit</button>
                </div>
            </form>



        )

    };


}