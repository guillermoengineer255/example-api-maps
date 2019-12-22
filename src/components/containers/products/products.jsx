import React from 'react'
import {getProductById} from '../../../config/grapqh-queries';
import {Header} from '../../../common/header';
import {Footer} from '../../../common/footer';
import {useQuery} from '@apollo/react-hooks';
import {Categories} from './categories';
import {withRouter} from 'react-router-dom';
import './products.css'


export const Products = (props) => {
    let id = ""
    let data = []
    let items = []
    if (props.location.state) {
        id = props.location.state
    }
    data = useQuery(
        getProductById, {
            variables: {
                id: id
            }
        }
    )
    if (data.data) {
        items = data.data.poc.products
    }
    return (
        <div>
            <Header />
            <Categories/>
            <div className="grid-container">
            
                {items !== undefined ? items.map((product, index) => {
                    return (
                        <div  key ={product.id} className="grid-table-cell">
                            <div className="product-card"> 
                                <img className="product-picture"  src={product.images[0].url} />
                                <p className="product-title">{product.title}</p>
                                <p className="product-price"> R$ {product.productVariants[0].price} </p>
                                <button className="button"> Add to Cart</button>
                            </div>
                        </div>
                    )
                }) : <p>Please go back to home page and write correct address...</p>
                }
            </div>
            <Footer />
        </div>
    )
}
export default withRouter(Products);