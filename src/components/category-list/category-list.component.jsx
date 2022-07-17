import {DirectoryItem} from '../directory-item/directory-item.component'
const CategoryList = ({categories}) => {
    return(
    <div className="categories-container">
        {
        categories.map((category)=>{
        return(
         <DirectoryItem category = {category} />
         )
        })
        }
    </div>
    )
}
export default CategoryList;