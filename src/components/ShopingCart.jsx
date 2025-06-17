import React, { useState } from 'react';
import './ShoppingCart.css';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const { id, name, price, quantity, image } = item;

    return (
        <div className="cart-item">
            <img src={image} alt={name} />
            <div className="item-details">
                <p>{name}</p>
                <span className="id">#{id}</span>
            </div>
            <div className="quantity-control">
                <button onClick={() => onQuantityChange(id, -1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => onQuantityChange(id, 1)}>+</button>
            </div>
            <p className="price">${(price * quantity).toFixed(2)}</p>
            <button className="remove" onClick={() => onRemove(id)}>×</button>
        </div>
    );
};

const CardDetails = () => {
    return (
        <div className="card-section">
            <div className="card-mockup">
                <p>Lorem Ipsum</p>
                <p>**** **** **** 1234</p>
                <p>12/30</p>
                <p className="name">Diana Smith</p>
                <p className="brand">VISA</p>
            </div>
            <form className="card-form">
                <label>Name</label>
                <input type="text" value="Diana Smith" readOnly />
                <label>Card Number</label>
                <input type="text" value="**** **** **** 5432" readOnly />
                <label>Expiration Date</label>
                <div className="expiry">
                    <input type="text" placeholder="MM" />
                    <input type="text" placeholder="YYYY" />
                </div>
                <label>CVV</label>
                <input type="text" placeholder="***" />
                <button className="checkout">Check Out</button>
            </form>
        </div>
    );
};

const ShoppingCart = () => {
    const [items, setItems] = useState([
        {
            id: '462019',
            name: 'Lorem Ipsum',
            price: 8.5,
            quantity: 1,
            image: 'https://via.placeholder.com/50?text=🥗',
        },
        {
            id: '465032',
            name: 'Lorem Ipsum',
            price: 11.0,
            quantity: 1,
            image: 'https://via.placeholder.com/50?text=🍕',
        },
        {
            id: '476555',
            name: 'Lorem Ipsum',
            price: 10.5,
            quantity: 1,
            image: 'https://via.placeholder.com/50?text=🍜',
        },
    ]);

    const handleQuantityChange = (id, delta) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <div className="shopping-cart">
            <div className="cart-section">
                <h2>Shopping Card</h2>
                {items.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                    />
                ))}
                <div className="subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
            </div>
            <CardDetails />
        </div>
    );
};

export default ShoppingCart;
