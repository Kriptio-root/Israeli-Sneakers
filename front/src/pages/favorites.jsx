import React from 'react'

import Card from "../components/Card/Card";

import {AppContext} from "./home";

function Favorites({onFavorite,loading,mockArr,onPlus,added,parentId}) {

    const { favorites, onAddToFavorite } = React.useContext(AppContext);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>
                    My favorites
                </h1>
            </div>

            <div className="d-flex flex-wrap">
                {(loading ? mockArr : favorites).map((item, index) => (<Card
                        key={index}
                        title={item.title}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        id={item.id}
                        onFavorite={onAddToFavorite}
                        onPlus={onPlus}
                        loading={loading}
                        parentId={item.parentId}
                        favorited={true}
                    />))}
            </div>
        </div>
    )

}

export default Favorites