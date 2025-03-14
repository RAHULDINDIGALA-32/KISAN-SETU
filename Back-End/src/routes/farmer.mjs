import express from 'express';
import { FarmerShop } from '../MongoDB/farmerShopDB.mjs';


export const getShop = async (req, res) => {
    try {
        const shop = await FarmerShop.findOne({ farmerId: req.user.id }).populate('products');
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addProduct = async (req, res) => {
    const { productName, productImage, price, quantity, description } = req.body;
    try {
        let shop = await FarmerShop.findOne({ farmerId: req.user.id });
        if (!shop) {
            shop = new FarmerShop({ farmerId: req.user.id, products: [] });
        }
        shop.products.push({ productName, productImage, price, quantity, description });
        await shop.save();
        res.status(201).json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { productName, productImage, price, quantity, description } = req.body;
    try {
        const shop = await FarmerShop.findOne({ farmerId: req.user.id });
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        const product = shop.products.id(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.productName = productName;
        product.productImage = productImage;
        product.price = price;
        product.quantity = quantity;
        product.description = description;
        await shop.save();
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const shop = await FarmerShop.findOne({ farmerId: req.user.id });
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        shop.products.id(productId).remove();
        await shop.save();
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getDashboard = async (req, res) => {
    try {
        const shop = await FarmerShop.findOne({ farmerId: req.user.id });
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        const stats = {
            totalProducts: shop.products.length,
            totalSales: shop.products.reduce((acc, product) => acc + product.quantity, 0),
            totalRevenue: shop.products.reduce((acc, product) => acc + (product.price * product.quantity), 0)
        };
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const router = express.Router();

router.get('/api/shop', getShop);
router.post('/api/shop/addProduct', addProduct);
router.put('/api/shop/:productId', updateProduct);
router.delete('/api/shop/:productId', removeProduct);
router.get('/api/dashboard', getDashboard);

export default router;
