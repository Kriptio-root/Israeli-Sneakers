import React from "react";
import axios from "axios";

import './drawer.scss'
import Info from "../Info/Info";
import {useCart} from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve,reject)=>setTimeout(resolve,ms))

function Drawer({onClose, onRemove, items = []}) {
    const {cartItems,setCartItems,totalPrice} = useCart()

    const [isComplete, setIsComplete] = React.useState(false)
    const [orderId, setOrderId] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)
    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://630e591337925634187bff3c.mockapi.io/orders', {items: cartItems})
            setOrderId(data.id)
            setIsComplete(true)
            setCartItems([])

  for (let i=0;i<cartItems.length;i++){
      const item =cartItems[i]
      await axios.delete('https://630e591337925634187bff3c.mockapi.io/cart/'+item.id)
      await delay(1000)
  }

        } catch (error) {
            alert('cant send order try in few minutes')
        }
        setIsLoading(false)
    }

    const imgRegex = ".jpg"
    return (
        <div className="drawer__overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">
                    Корзина <img onClick={onClose} className="cu-p" src="img/btn-remove.svg" alt="Close"/>
                </h2>
                {items.length > 0 ? (
                    <div>
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20 " payload={obj.id}>
                                    <div
                                        style={{backgroundImage: `url(${obj.imageUrl})`}}
                                        className="cartItemImg"></div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{Math.round(obj.price)} {'\u20aa'}</b>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className="removeBtn"
                                        src="img/btn-remove.svg"
                                        alt="Remove"/>
                                </div>
                            ))}
                        </div>

                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Total price:</span>
                                    <div></div>
                                    <b>{totalPrice} {'\u20aa'}</b>
                                </li>
                                <li>
                                    <span>Tax 17%:</span>
                                    <div></div>
                                    <b>{Math.round(totalPrice/100*5)} {'\u20aa'}</b>
                                </li>
                            </ul>
                            <button onClick={onClickOrder} className="greenButton">
                                Process order <img src="img/arrow.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        image={isComplete ? "img/complete-cart.png" : 'img/emptyCart.svg'}
                        title={isComplete ? "Order complete!" : "Cart is empty"}
                        description={isComplete ? `You will get your order number ${orderId} soon!` : "Add at least one item to process the order."}
                    ></Info>
                )}
            </div>
        </div>
    );
}

export default Drawer;
