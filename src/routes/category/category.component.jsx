import './category.styles.scss'
import { useContext, useState,useEffect, Fragment } from 'react';
import { ProductCard } from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import {useParams} from 'react-router-dom';
const Category = () => {
  
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const[products,setProducts] = useState([]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category,categoriesMap]);
    return(
        <Fragment>
        <h2 className='title'>{category.toUpperCase()}</h2>

        <div className='category-x-container'>
            
            {
                products &&
                products.map((product) => {
                    return(
                    <ProductCard product={product}/>)
                })
            }
        </div>
        </Fragment>
    )
}
export {Category};