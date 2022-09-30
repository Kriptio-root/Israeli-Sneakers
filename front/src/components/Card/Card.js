import React from 'react';
import ContentLoader from "react-content-loader"

import './Card.scss'
import {AppContext} from "../../pages/home";

function Card({
                  title,
                  imageUrl,
                  price,
                  onFavorite,
                  onPlus,
                  id,
                  favorited = false,
                  added = false,
                  loading = true
}) {
    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const imgRegex = ".jpg"
    const obj={id, parentId: id, title, imageUrl,price}

    const {isItemAdded,isAddedToFavorites} = React.useContext(AppContext)

    const onClickPlus = () => {
        //onPlus({title, imageUrl, price, isItemAdded, id});
        onPlus(obj)
    };
    const onClickFavorite = () => {
        onFavorite(obj)
        setIsFavorite(!isFavorite)
       // onFavorite({title, imageUrl, price, isItemAdded, id});
    }


    return (
        <div className="card">
            {loading ?
                (
                    <ContentLoader
                        speed={2}
                        width={155}
                        height={250}
                        viewBox="0 0 155 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
                        <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
                        <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
                        <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
                        <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
                    </ContentLoader>
                )
                :
                <>
                    {onFavorite&& <div className="favorite" onClick={onClickFavorite}>
                        <img src={isFavorite  ? 'img/heart-liked.svg' : "img/heart-unliked.svg"} alt="Unliked"/>
                    </div>}
                    <img width='100%' height={135}
                         src={imageUrl}
                         alt={imageUrl.toString()}/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Price:</span>
                            <b>{Math.round(price)} {'\u20aa'}</b>
                        </div>
                        {onPlus&&<img
                            className="plus"
                            onClick={onClickPlus}
                            src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                            alt="PlusImg"
                        />}
                    </div>
                </>

            }
        </div>
    );
}

export default Card;
