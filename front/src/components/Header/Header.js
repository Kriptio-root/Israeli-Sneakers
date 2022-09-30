import React from "react";
import { Link } from 'react-router-dom';
import {useCart} from "../../hooks/useCart";

function Header(props) {
    const {totalPrice} = useCart()

  return (
    <header className="d-flex justify-between align-center p-40">
        <Link to="/Israeli-Sneakers">
      <div className="d-flex align-center">
        <img width={40} height={40} src="img/logo.png" alt="logo"/>
        <div>
          <h3 className="text-uppercase">Israel Sneakers</h3>
          <p className="opacity-5">Best sneakers shop in israel</p>
        </div>
      </div>
        </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="img/cart.svg" alt="cartImage"/>
          <span>{totalPrice} {'\u20aa'} </span>
        </li>
          <Link to="/Israeli-Sneakers/favorites">
          <li className="mr-15 cu-p">
              <img width={18} height={18} src="img/heart.svg" alt="favoritesHeart"/>
          </li>
          </Link>
          <Link to="/Israeli-Sneakers/orders">
        <li>
          <img width={18} height={18}  src="img/user.svg" alt="userProfile"/>
        </li>
          </Link>
      </ul>
    </header>
  );
}

export default Header;
