import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './cart.css';
import CartProduct from './cartProduct/CartProduct';

export default function Cart() {
    const products = useSelector(state => state.cart.value);
    const shop = useSelector(state => state.cart.shop);
    const total = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.address || products.length === 0) {
            toast.error("Please fill out all fields and add products to your cart.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/orders', { ...formData, 'shop': shop, 'total_price': total, 'products': products });
            toast.success("Order placed successfully!");
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
            });
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error("An error occurred while placing your order.");
        }
    };

    return (
        <>
            <div className="cart">
                <form className="cart__form" >
                    <label className="cart__form__label">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="cart__form__input" />

                    <label className="cart__form__label">Email</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} className="cart__form__input" />

                    <label className="cart__form__label">Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="cart__form__input" />

                    <label className="cart__form__label">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="cart__form__input" />
                </form>

                <section className="cart__goods">
                    {products?.map(i => (
                        <CartProduct key={i.id} i={i} />
                    ))}
                </section>
            </div>

            <div className="cart__total">
                <h2>Total price: ${total}</h2>
                <button onClick={handleSubmit} className="cart__form__submit">Submit</button>
            </div>
            <ToastContainer />
        </>
    );
}
