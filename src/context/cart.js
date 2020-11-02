// cart context
import React, { useEffect, useReducer, useState } from 'react';
import reducer from './reducer';
import { REMOVE, INCREASE_AMOUNT, DECREASE_AMOUNT, ADD_TO_CART, CLEAR_CART } from './actions';


const CartContext = React.createContext();

function getCartFromLocalStorage() {
    return localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
}

function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(reducer, getCartFromLocalStorage());
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState(0)

    useEffect(() => {
        //local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        // calculate the total number of items on the cart
        let newCartItems = cart.reduce((total, cartItem) => {
            return (total += cartItem.amount);
        }, 0);
        setCartItems(newCartItems);
        // get the total amount of items from the cart
        let newTotal = cart.reduce((total, cartItem) => {
            return (total += (cartItem.amount * cartItem.price));
        }, 0);
        newTotal = parseFloat(newTotal.toFixed(2));
        setTotal(newTotal);
    }, [cart]);

    //remove item
    const removeItem = id => {
        dispatch({ type: REMOVE, payload: id });
    };
    //increase amount
    const increaseAmount = id => {
        dispatch({ type: INCREASE_AMOUNT, payload: id });
    };
    // decrease amount
    const decreaseAmount = (id, amount) => {
        if (amount === 1) {
            dispatch({ type: REMOVE, payload: id });
            return;
        }
        else {
            dispatch({ type: DECREASE_AMOUNT, payload: id });
        }

    };
    // add to cart
    const addToCart = product => {
        let item = [...cart].find(item => item.id === product.id);
        if (item) {
            dispatch({ type: INCREASE_AMOUNT, payload: product.id });
            return;
        } else {
            dispatch({ type: ADD_TO_CART, payload: product });
        }
    };
    // clear cart
    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    };

    return <CartContext.Provider
        value={{
            cart,
            total,
            cartItems,
            removeItem,
            increaseAmount,
            decreaseAmount,
            addToCart,
            clearCart,
        }}
    >
        {children}
    </CartContext.Provider>
}

export { CartContext, CartProvider };