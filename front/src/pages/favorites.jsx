import React from 'react'

import Card from "../components/Card/Card";

import {AppContext} from "./home";

function Favorites({onFavorite}) {
const state=React.useContext(AppContext)
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>
                    My favorites
                </h1>
            </div>

            <div className="d-flex flex-wrap">
                {state.favorites.map((item, index) => (<Card
                        key={index}
                        title={item.title}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        id={item.id}
                        favorited={true}
                        onFavorite={onFavorite}
                    />))}
            </div>
        </div>
    )

}

export default Favorites