import React from 'react'

import Card from "../components/Card/Card";
import axios from "axios";

function Orders({onFavorite,loading,mockArr,added}) {
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const {data:ordersList} = await axios.get('https://630e591337925634187bff3c.mockapi.io/orders')
                setOrders(ordersList.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Erro while sending orders request');
                console.error(error);
            }
        })();
    }, []);


    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>
                    My orders
                </h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? mockArr : orders).map((item, index) => (<Card
                    key={index}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    id={item.id}
                    loading={isLoading}
                    parentId={item.parentId}
                />))}
            </div>
        </div>
    )

}

export default Orders