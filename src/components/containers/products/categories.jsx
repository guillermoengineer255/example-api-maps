import React from 'react'
import {useQuery} from '@apollo/react-hooks';
import {getProductsCategory} from '../../../config/grapqh-queries';

export const Categories = () => { 
    let data = []
    let items = []
    data = useQuery(
        getProductsCategory
    )
    if ( data.data ) { 
        items = data.data.allCategory
    }
    return ( 
        <div className="grid-categories"> 
            {items ? items.map((item) => { 
                return ( 
                    <button className="categories">{item.title} </button>
                )
            }) : <div> </div> }
        </div>
    )
}