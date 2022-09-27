import React from 'react';
import axios from "axios";
import {Route, Routes} from "react-router-dom";

import Drawer from "../components/Drawer/Drawer";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Favorites from "./favorites";


function Home() {
    const [items, setItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeSearchInput = (event) => {
        //console.log(event.target.value)
        setSearchValue(event.target.value);
    }

    const renderItems =() => {
        const filteredItems =items.filter((item) => item.title.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
    return (
        isLoading ? [...Array(8)] : filteredItems
                .map((item, index) => (
                    <Card
                    key={index}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    id={item.id}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
                    loading={isLoading}
                />))
    )

    }

    React.useEffect( () => {
        async function fetchData() {
            setIsLoading(true)

            const {data:itemsResponse} = await axios.get('https://630e591337925634187bff3c.mockapi.io/items')

            const {data:cartResponse}  = await  axios.get('https://630e591337925634187bff3c.mockapi.io/cart')

            const {data:favoritesResponse}  = await axios.get('https://630e591337925634187bff3c.mockapi.io/favorites')

            setIsLoading(false)

            setCartItems(cartResponse);
            setFavorites(favoritesResponse);
            setItems(itemsResponse);
        }
        fetchData();
    }, []);

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://630e591337925634187bff3c.mockapi.io/favorites/${obj.id}`)
                setFavorites((prev) => prev.filter(item => item.id !== obj.id))
            } else {
                const {data} = await axios.post('https://630e591337925634187bff3c.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('cant add to favorites,try it now')
        }

    };

    const onAddToCart = (obj) => {
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
                axios.delete(`https://630e591337925634187bff3c.mockapi.io/cart/${obj.id}`);
            } else {
                axios.post('https://630e591337925634187bff3c.mockapi.io/cart', obj);
                setCartItems((prev) => [...prev, obj]);
            }
        } catch (error) {

        }
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://630e591337925634187bff3c.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
    }

    return (
        <div className="wrapper clear">
            {cartOpened &&
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}/>}
            <Header onClickCart={() => setCartOpened(true)}/>
            <Routes>
                <Route path="*" exact element={
                    <div className="content p-40">
                        <div className="d-flex align-center justify-between mb-40">
                            <h1>{searchValue.length > 0 && searchValue.toString() !== '' ? `Search for request : "${searchValue}"` : 'All Sneakers'}</h1>
                            <div className="search-block d-flex">
                                <img src="/img/search.svg" alt="Search"/>
                                <input
                                    onChange={onChangeSearchInput}
                                    value={searchValue}
                                    placeholder="Search..."/>
                                {searchValue &&
                                    <img onClick={() => setSearchValue('')} className="clearImg"
                                         src="/img/btn-remove.svg"
                                         alt="ClearImg"/>}
                            </div>
                        </div>

                        <div className="d-flex flex-wrap">
                            {renderItems()}
                        </div>
                    </div>}>
                </Route>
                <Route path='favorites' exact
                       element={<Favorites items={{favorites}} onFavorite={(obj) => onAddToFavorite(obj)}/>}></Route>
            </Routes>
        </div>
    )
}

export default Home