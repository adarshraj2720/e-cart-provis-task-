import React from "react";
import { useState } from "react";


 export default function Cart(props) {

    //state store
    let [display, setdisplay] = useState(false)
    let [changeqty, setchangeqty] = useState(false)
    let [cart, setcart] = useState([])


    //handle cart componnet open cart component
    function handleclick() {
        setdisplay(true);
        setcart(props.info)
    }

    // handle cart component close the cart component
    function handledelete() {
        setdisplay(false)
        setchangeqty(false)
    }

    //handle the quantity inc.. in cart component
    function handleInc(event) {
        let id = event.target.id
        let singleProduct = props.info.filter((p) => Number(p.id) === Number(id));
        singleProduct[0].Qty = singleProduct[0].Qty + 1;
        setchangeqty(true)
        setcart([...cart], singleProduct[0])
    }

    //handle the quantity dec.. in cart component
    function handleDec(event) {
        let id = event.target.id;
        let singleProduct = props.info.filter((p) => Number(p.id) === Number(id))
        if (singleProduct[0].Qty > 1) {
            singleProduct[0].Qty = singleProduct[0].Qty - 1;
        }else{
            alert(' Not less than 1 product')
        }
        setcart([...cart], singleProduct[0])
        setchangeqty(true)
    }

    // handle delete the product from the cart
    function handleDel(event) {
        let id = event.target.id
        let singleProduct = cart.filter((p) => Number(p.id) !== Number(id));
        console.log(singleProduct)
        setcart(singleProduct)
    }

    //handle the checkout when click on checkout btn
    function handlecheckout() {  
        let qnty= cart.length
        let price= [...new Set (cart)].reduce((acc,cv)=>{
            acc =  acc + cv.price * cv.Qty
            // return `Total Amount of ${qnty} product  ${acc}`
            return acc
            
        },0)
    
        alert(`Total Product ${qnty} and Amount ${price}`)
    }


    return (
        <>
            {display === false || cart.length === 0 ? (
                <div >
                    <figure>
                        <img className="bagicon" onClick={handleclick} src={'/static/bag-icon.png'} alt="bagicon" ></img>
                    </figure>
                    <small className="cartlength">{[...new Set(props.info)].length}</small>
                </div>

            ) : (
                
                <div className="cartcategory">
                    <div className="shoppingsummary">
                        <p className="summary">Shopping Summary</p>
                        <button onClick={handledelete}>❌</button>
                    </div>


                    {
                        [...new Set(cart)].map((a) => {
                            return (
                                <div className="cartlist">
                                    <img className="cartproductimg" src={`${'/static/products/' + `${a.sku}` + '_1.jpg'}`} alt="prod-img"></img>
                                    <p>Title: {a.title}</p>
                                    {
                                        changeqty === true ?
                                            <p>Quantity:{a.Qty}</p>
                                            :
                                            <p>Quantity:{a.Qty}</p>
                                    }
                                    <button id={a.id} onClick={handleInc}>+</button>
                                    <button id={a.id} onClick={handleDec}>-</button>
                                    <button id={a.id} onClick={handleDel}>del</button>
                                    <p>Price:{a.currencyFormat}{a.price}</p>

                                </div>
                            )
                        })}

                    <div className="shoppingsummary">
                        <p className="summary">SubTotal: {[...new Set(cart)].reduce((acc, cv) => {
                            acc = acc + cv.price * cv.Qty
                            return acc;
                        }, 0)}</p>
                        <button onClick={handlecheckout} >Checkout</button>
                    </div>
                </div>
            )}
        </>
    )
}

