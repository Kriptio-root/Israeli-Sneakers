import React from 'react';
import axios from "axios";
import {Route, Routes} from "react-router-dom";

import Drawer from "../components/Drawer/Drawer";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Favorites from "./favorites";
import Search from "../components/Search/Search"
import Orders from "./Orders";

export const AppContext = React.createContext({})

function Home() {
    const [items, setItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState(['']);
    const [favorites, setFavorites] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const mockArr = [
        {title: 'checking', price: 'checking', imageUrl: '/img/sneakers/.jpg', id: '1'},
        {title: 'checking', price: 'checking', imageUrl: '/img/sneakers/.jpg', id: '2'},
        {title: 'checking', price: 'checking', imageUrl: '/img/sneakers/.jpg', id: '3'},
        {title: 'checking', price: 'checking', imageUrl: '/img/sneakers/.jpg', id: '4'},
        {title: 'checking', price: 'checking', imageUrl: '/img/sneakers/.jpg', id: '5'},
        {title: 'checking', price: 'checking', imageUrl: '/img/sneakers/.jpg', id: '6'},
        {title: 'checking', price: 'checking', imageUrl: '/img/sneakers/.jpg', id: '7'},
        {title: 'checking', price: 'checking', imageUrl: '/img/sneakers/.jpg', id: '8'}
    ]

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
        return (
            (isLoading ? mockArr : filteredItems)
                .map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        id={item.id}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                        loading={isLoading}
                        parentId={item.parentId}
                        favorited={isAddedToFavorites(item.id)}
                    />))
        )

    }

    React.useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            try {
                const [itemsResponse,cartResponse,favoritesResponse] = await Promise.all([
                    axios.get('https://630e591337925634187bff3c.mockapi.io/items'),

                    axios.get('https://630e591337925634187bff3c.mockapi.io/cart'),

                    axios.get('https://630e591337925634187bff3c.mockapi.io/favorites'),
                ])

                setIsLoading(false)
                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Error while sending data  request')
            }

            setIsLoading(false)

        }

        fetchData();
    }, []);

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://630e591337925634187bff3c.mockapi.io/favorites/${obj.id}`)
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const {data} = await axios.post('https://630e591337925634187bff3c.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('cant add to favorites,try it now')
            console.error(error);
        }

    };

    const onAddToCart = async  (obj) => {
        try {
            const findItem =cartItems.find((item) => Number(item.parentId) === Number(obj.id))
            if(findItem) {
                setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
                await  axios.delete(`https://630e591337925634187bff3c.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems((prev) => [...prev, obj]);
                const {data} = await  axios.post('https://630e591337925634187bff3c.mockapi.io/cart', obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );
            }
        } catch (error) {
alert('Cant add to cart')
            console.error(error);
        }
    };

    const onRemoveItem = (id) => {
        try {
        axios.delete(`https://630e591337925634187bff3c.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
        } catch (error) {
            alert('Cant remove from cart')
            console.error(error);
        }
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    }

    const isAddedToFavorites = (id) => {
        return favorites.find((favObj) => Number(favObj.parentId) === Number(id))
    }

    return (
        <AppContext.Provider
            value={{items, favorites, setCartOpened, setCartItems, cartItems, isItemAdded, isAddedToFavorites,onAddToFavorite,onAddToCart}}>
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
                            <Search
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                            ></Search>
                            <div className="d-flex flex-wrap">
                                {renderItems()}
                            </div>
                        </div>}>
                    </Route>
                    <Route path='favorites' exact
                           element={<Favorites
                               mockArr={mockArr}
                               loading={isLoading}
                               onFavorite={(obj) => onAddToFavorite(obj)}
                               onPlus={(obj) => onAddToCart(obj)}
                           />}></Route>
                    <Route path='orders' exact
                           element={<Orders
                               mockArr={mockArr}
                               loading={isLoading}
                               onFavorite={(obj) => onAddToFavorite(obj)}
                               onPlus={(obj) => onAddToCart(obj)}
                           />}></Route>
                </Routes>
            </div>
        </AppContext.Provider>
    )
}

export default Home