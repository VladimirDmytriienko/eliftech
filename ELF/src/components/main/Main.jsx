import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateShop } from '../../features/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main.css'
import photo from '../../assets/picture.jpg'

const drugShopNames = [
    "Pill Palace",
    "Rx Haven",
    "PharmaFusion",
    "MediMart",
    "Cure Corner",
    "Health Haven",
    "Wellness World",
    "Drug Depot",
    "Remedy Realm",
    "Pharmaceutica Junction"
];

export default function Main() {
    const [goods, setGoods] = useState([]);
    const store = useSelector(state => state.cart.shop);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:3000/goods')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setGoods(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);
    const handleShopSelect = (shop) => {
        dispatch(updateShop(shop))


    };
    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        toast.success(`${item.name} added to cart`); 
    };

    return (
        <div className="container">
            <aside className="aside">
                <h2>Shops</h2>
                <ul className="shop-list">
                    {drugShopNames.map((shop, index) => (
                        <li
                            key={index + shop}
                            className={`shop-item ${shop === store ? 'selected' : ''}`}
                            onClick={() => handleShopSelect(shop)} 
                        >
                            {shop}
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="main">
                {goods.map((product, index) => (
                    <div key={index + product.name} className="product-card">
                        <div><img src={photo} alt="product photo" /></div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>{product.price} $</p>
                            <a onClick={() => handleAddToCart(product)}>Add</a>
                        </div>
                    </div>
                ))}
            </main>
            <ToastContainer />
        </div>
    )
}
