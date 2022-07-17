import './cart-dropdown.styles.scss'
import { Button } from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {useNavigate} from 'react-router-dom';
//
export const CartDropDown = () =>{
    const {cartItems} = useContext(CartContext);
    console.log('Iam in the card dropdown',cartItems);
    const navigate = useNavigate();
    const gotToNavigateHandler = () => {
        navigate('/checkout');
    }
    return(
       
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
               {cartItems.map(item => {return <CartItem key={item.id} cartItem={item}/>})}
                </div>
                <Button buttonType='inverted' onClick={gotToNavigateHandler}>Go to Checkout</Button>
            </div>
    );
};