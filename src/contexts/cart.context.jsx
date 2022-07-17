import { createContext,useState,useEffect } from "react";

const addCartItem = (cartItemsArray,productToAdd) =>{
    console.log(productToAdd);
    //find if it contains the product to add
    const existingCartItem = cartItemsArray.find((cartItem) => cartItem.id === productToAdd.id);
    //if found increment
    if(existingCartItem){
        return cartItemsArray.map((cartItem) => 
        cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    } 
    //return new array
    return [...cartItemsArray,{...productToAdd,quantity: 1}];
}
const removeCartItem = (cartItemsArray,cartItemToRemove) =>{
    //find if it contains the product to add
    const existingCartItem = cartItemsArray.find((cartItem) => cartItem.id === cartItemToRemove.id);
    //if found increment
    if(existingCartItem.quantity === 1){
        return cartItemsArray.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    } 
    return cartItemsArray.map((cartItem) => 
        cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
}
const deleteCartItem = (cartItemsArray,cartItemToRemove) =>{

    //if found clear
    return cartItemsArray.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

export const CartContext = createContext({
    isCartOpen:false,
    cartItems:[],
    addItemToCart: () => {},
    setIsCartOpen: () => {},
    removeItemFromCart: () => {},
    cartCount:0,
    cartTotal:0
});

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);
    const addItemToCart = (productToAdd) => {
        console.log('adding item to cart',productToAdd);
        const cart = addCartItem(cartItems, productToAdd);
        setCartItems(cart);
        console.log(cart);
    }
    const removeItemFromCart = (productToRemove) => {
        const cart = removeCartItem(cartItems, productToRemove);
        setCartItems(cart);
    }
    const deleteItemFromCart = (productToRemove) => {
        const cart = deleteCartItem(cartItems, productToRemove);
        setCartItems(cart);
    }
    useEffect(()=>{
        const newCartCount = 
        cartItems.reduce((total,cartItem) => total + cartItem.quantity,0); 
        setCartCount(newCartCount);
    },[cartItems]);

    useEffect(()=>{
        const newCartTotal = 
        cartItems.reduce((total,cartItem) => total + cartItem.quantity * cartItem.price,0); 
        setCartTotal(newCartTotal);
    },[cartItems]);

    const value = {
        isCartOpen,setIsCartOpen,addItemToCart,removeItemFromCart,deleteItemFromCart, 
        cartItems,cartCount, cartTotal};
    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    )
};