import React from 'react';
import axios from "axios";

import Card from './components/Card/Card';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';

import './common/styles/style.scss'

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://630e591337925634187bff3c.mockapi.io/items')
            .then(res => {
                setItems(res.data);
            });
        axios.get('https://630e591337925634187bff3c.mockapi.io/cart')
            .then(res => {
                setCartItems(res.data);
            });
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://630e591337925634187bff3c.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://630e591337925634187bff3c.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
    }

    const onChangeSearchInput = (event) => {
        //console.log(event.target.value)
        setSearchValue(event.target.value);
    }

    return (
        <div className="wrapper clear">
            {cartOpened &&
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}/>}
            <Header onClickCart={() => setCartOpened(true)}/>
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>{searchValue ? `Search for request : "${searchValue}"` : 'All Sneakers'}</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input
                            onChange={onChangeSearchInput}
                            value={searchValue}
                            placeholder="Поиск..."/>
                        {searchValue &&
                            <img onClick={() => setSearchValue('')} className="clearImg" src="/img/btn-remove.svg"
                                 alt="ClearImg"/>}
                    </div>
                </div>

                <div className="d-flex flex-wrap">
                    {
                        items.filter((item) => item.title.toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
                            .map((item, index) => (
                                <Card
                                    key={index}
                                    title={item.title}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    onFavorite={() => console.log('Добавили в закладки')}
                                    onPlus={(obj) => onAddToCart(obj)}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
}

export default App;
