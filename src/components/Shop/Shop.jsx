import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

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
        for(const id in storedCart){
            //step 2 get product by id
            const addedProduct=products.find(product=>product.id===id)
            if(addedProduct){ //otherwise gives error when empty
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
        let newCart=[];
        //const newCart=[...cart,product];
        //if product does not exist in the cart, then set quantity 1
        //if exist update by 1
        const exists= cart.find(pd =>pd.id===product.id);
        if(!exists){
            product.quantity=1;
            newCart=[...cart,product]
        }
        else{
            exists.quantity=exists.quantity+1;
            const remaining=cart.filter(pd=>pd.id!==product.id);
            newCart=[...remaining,exists]
        }

        setCart(newCart);
        addToDb(product.id)
    }
    const handleClearCart=()=>{
        setCart([]);
        deleteShoppingCart();
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
                <Cart cart={cart}
                handleClearCart={handleClearCart}>
                    <Link className='proceed-link' to='/orders'>
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;