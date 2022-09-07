import React from 'react';
import './Card.scss'

function Card({ title, imageUrl, price, onFavorite, onPlus }) {
    const [isAdded,setIsAdded] = React.useState(false);

    const onClickPlus = () => {
        setIsAdded(isAdded=>!isAdded)
        console.log(isAdded)
        onPlus({ title, imageUrl, price,isAdded });

    };


  return (
    <div className="card">
      <div className="favorite" onClick={onFavorite}>
        <img src="/img/heart-unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
          <img
              className="plus"
              onClick={onClickPlus}
              src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
              alt="PlusImg"
          />
      </div>
    </div>
  );
}

export default Card;
