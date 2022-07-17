import { useContext } from 'react';
import {CartContext} from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) =>{
    const {name,price,quantity,imageUrl} = cartItem;
    const {deleteItemFromCart,addItemToCart,removeItemFromCart} = useContext(CartContext);
    const addItemToCartHandler = (cartItem) => addItemToCart(cartItem);
    const removeItemToCartHandler = (cartItem) => removeItemFromCart(cartItem);
    const clearItemHandler = (cartItem) => deleteItemFromCart(cartItem);
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
                <span className='name'>
                {name}
                </span>
                <span className='quantity'>
                <div className='arrow' onClick={() => removeItemToCartHandler(cartItem)}>
                &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItemToCartHandler(cartItem)}>
                &#10095;  
                </div>
                </span>
                <span className='price'>
                {price}
                </span>
                <div className='remove-button' onClick={() => clearItemHandler(cartItem)}>&#10005;</div>
        </div>
    )
};
export {CheckoutItem};