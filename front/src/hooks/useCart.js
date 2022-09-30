import React from "react";
import {AppContext} from "../pages/home";

export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext)

    const totalPrice = cartItems.reduce((sum,obj) => Number(obj.price) + Number(sum), 0)

    return { cartItems, setCartItems, totalPrice }
}