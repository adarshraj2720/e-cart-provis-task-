import React from "react";
import { useState } from "react";


//import the component
import data from '../data.json'
import Cart from "./Cart";

 
 export default function Products() {

    //state store

    let [allProduct, setallProduct] = useState(data.products);
    let [isCart, setisCart] = useState([]);


    //handle the cart when you add the product on the cart
    function handlecart(event) {
        let id = event.target.id;
        let prodctlist = data.products.filter((a) => Number(a.id) === Number(id))
        prodctlist[0].Qty = 1
        setisCart(isCart.concat(prodctlist))
    }

    return (

        <main>
            <div className="cart">
            <Cart info={isCart} />             
            </div>
            <div className="length">
                <p>{allProduct.length} Products </p>
            </div>
            <div className="product">

                {
                    allProduct.map((product) => {
                        return (
                            <div className="products" id={product.id} >
                                <figure>
                                    <img src={'/static/products/' + `${product.sku}` + '_1.jpg'} alt="product-img"></img>
                                </figure>
                                <p className="producttitle">{product.title}</p>
                                <p className="productprice">Price:{product.currencyFormat}{product.price}</p>
                                <button className="addcartbtn" id={product.id} onClick={handlecart}>Add To Cart</button>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}
