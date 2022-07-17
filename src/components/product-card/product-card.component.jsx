import './product-card.styles.scss';
import { Button } from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) =>{

    const {name,price,id,imageUrl} = product;
    const {addItemToCart} = useContext(CartContext);
    const addProductToCart = () =>addItemToCart(product);
    return(
        <div key={id} className='product-card-container'>
            <img src = {imageUrl}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to cart</Button>
        </div>
    );
};

export {ProductCard};