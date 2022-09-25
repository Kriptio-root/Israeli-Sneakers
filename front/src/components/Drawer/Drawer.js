import './drawer.scss'

function Drawer({onClose, onRemove, items = []}) {
    const imgRegex=".jpg"
    return (
        <div className="drawer__overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">
                    Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close"/>
                </h2>
                {items.length > 0 ? (
                    <div>
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20 " payload={obj.id} >
                                    <div
                                        style={{backgroundImage: `url(${[obj.imageUrl.slice(0,obj.imageUrl.search(imgRegex)),obj.id, obj.imageUrl.slice(obj.imageUrl.search(imgRegex))].join('')})`}}
                                        className="cartItemImg"></div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className="removeBtn"
                                        src="/img/btn-remove.svg"
                                        alt="Remove"/>
                                </div>
                            ))}
                        </div>

                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>21 498 руб. </b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 руб. </b>
                                </li>
                            </ul>
                            <button className="greenButton">
                                Process order <img src="/img/arrow.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/img/emptyCart.svg" alt="Empty"/>
                        <h2>Cart is empty</h2>
                        <p className="opacity-6">Add at least one item to process the order.</p>
                        <button onClick={onClose} className="greenButton">
                            <img src="/img/arrow.svg" alt="Arrow"/>
                            Go back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;
