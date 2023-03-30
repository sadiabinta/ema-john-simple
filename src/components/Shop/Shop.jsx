import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart,setCart]=useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(()=>{
        const storedCart=getShoppingCart();
        const savedCart=[];
        //step 1 get i d of added product
        for(const id in products){
            //step 2 get product by id
            const addedProduct=products.find(product=>product.id===id)
            if(addedProduct){//otherwise gives error when empty
                //step 3 add quantity
                const quantity=storedCart[id];
                addedProduct.quantity=quantity;
                //step 4 add adder product to saved product
                savedCart.push(addedProduct);
            }
        }
        // stwp 5 set cart
        setCart(savedCart)
    },[products])//dependency so that this is called after loading product
    const handleAddToCart =(product)=>{
        const newCart=[...cart,product];
        setCart(newCart);
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product    key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;