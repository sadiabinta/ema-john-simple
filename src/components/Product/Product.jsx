import React from 'react';
import './Product.css'

const Product = (props) => {
    const {img,name,seller,ratings,price}=props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div class='product-info'>
            <h6 class='product-name'>{name}</h6>
            <p>Price: ${price}</p>
            <p>Manufactures: {seller}</p>
            <p>Rating: {ratings} Stars</p>
            </div>
            <button className='btn-cart'>Add to cart</button>
        </div>
    );
};

export default Product;