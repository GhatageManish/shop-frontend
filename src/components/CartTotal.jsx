import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee, cartItems, products } = useContext(ShopContext);

    // Calculate subtotal directly
    const subtotal = Object.keys(cartItems).reduce((total, itemId) => {
        const product = products.find(p => p._id === itemId);
        if (!product) return total;

        const sizes = cartItems[itemId];
        const sizeTotal = Object.keys(sizes).reduce((sum, size) => {
            return sum + (sizes[size] || 0) * product.price;
        }, 0);

        return total + sizeTotal;
    }, 0);

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {subtotal}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {subtotal === 0 ? 0 : subtotal + delivery_fee}.00</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal;
