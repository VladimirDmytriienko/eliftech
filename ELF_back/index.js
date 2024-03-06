const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');

const srv = express();
const jsonBodyParser = express.json();

srv.use(jsonBodyParser);
srv.use(cors()); 
srv.use(morgan(':method :url :status'));

srv.listen(3000, () => console.log('Express server is running [3000]'));

const db = knex(knexConfig);

srv.post('/orders', async (req, res) => {
    try {
        const { name, email, phone, address, shop, total_price, products } = req.body;
        await db('orders').insert({
            name,
            email,
            phone,
            address,
            shop,
            total_price,
            products: JSON.stringify(products)
        });
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

srv.post('/goods', async (req, res) => {
    try {
        const products = req.body; 
        await db('goods').insert(products);
        res.status(201).json({ message: 'Products created successfully' });
    } catch (error) {
        console.error('Error creating products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

srv.get('/orders', async (req, res) => {
    try {
        const orders = await db.select().from('orders');
        res.json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

srv.get('/goods', async (req, res) => {
    try {
        const goods = await db.select().from('goods');
        res.json(goods);
    } catch (error) {
        console.error('Error retrieving goods:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
