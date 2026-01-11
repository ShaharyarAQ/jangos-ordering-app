import { createContext, useState } from "react";

export const CartContext = createContext({
    itemNames: [],
    addCartItem: (itemName) => { },
    removeCartItem: (itemName) => { },
    increaseQuantity: (itemName) => { },
    decreaseQuantity: (itemName) => { },
});

function CartContextProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);
    
    async function addCartItem(itemName) {
        await setCartItems((currentCartItems) => [...currentCartItems, itemName])
    }

    async function removeCartItem(itemName) {
        await setCartItems((currentCartItems) => currentCartItems.filter((item) => item !== itemName))
    }

    async function increaseQuantity(id) {
        let tempCartItems = cartItems.map(item => {
            if (item.id === id) {
                let quantity_ = item.quantity + 1;
                return { ...item, quantity: quantity_ };
            }
            return item;
        });
        setCartItems(tempCartItems);
    }

    async function decreaseQuantity(id) {
        let tempCartItems = cartItems.map(item => {
            if (item.id === id && item.quantity > 1) {
                let quantity_ = item.quantity - 1;
                return { ...item, quantity: quantity_ };
            }
            return item;
        });
        setCartItems(tempCartItems);
    }

    const value = {
        itemNames: cartItems,
        addCartItem: addCartItem,
        removeCartItem: removeCartItem,
        increaseQuantity: increaseQuantity,
        decreaseQuantity: decreaseQuantity,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}

export default CartContextProvider;