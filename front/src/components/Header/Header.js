function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="logo"/>
        <div>
          <h3 className="text-uppercase">Israel Sneakers</h3>
          <p className="opacity-5">Best sneakers shop in israel</p>
        </div>
      </div>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="cartImage"/>
          <span>1205 руб.</span>
        </li>
          <li className="mr-15 cu-p">
              <img width={18} height={18} src="/img/heart.svg" alt="favoritesHeart"/>
          </li>
        <li>
          <img width={18} height={18}  src="/img/user.svg" alt="userProfile"/>
        </li>
      </ul>
    </header>
  );
}

export default Header;
