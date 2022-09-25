import React from 'react';
import './Card.scss'

function Card({ title, imageUrl, price, onFavorite, onPlus,id,favorited=false }) {
    const [isAdded,setIsAdded] = React.useState(false);
    const [isFavorite,setIsFavorite] = React.useState(favorited);
    const imgRegex=".jpg"

    const onClickPlus = () => {
        setIsAdded(isAdded=>!isAdded)
        onPlus({ title, imageUrl, price,isAdded,id });
    };
    const onClickFavorite = () => {
        setIsFavorite(!isFavorite)
        onFavorite({ title, imageUrl, price,isAdded,id });
    }


  return (
    <div className="card">
      <div className="favorite" onClick={onClickFavorite}>
        <img src={isFavorite ? '/img/heart-liked.svg' : "/img/heart-unliked.svg"} alt="Unliked" />
      </div>
      <img width={133} height={112} src={[imageUrl.slice(0,imageUrl.search(imgRegex)),id, imageUrl.slice(imageUrl.search(imgRegex))].join('')} alt={imageUrl.toString()}/>
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
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
