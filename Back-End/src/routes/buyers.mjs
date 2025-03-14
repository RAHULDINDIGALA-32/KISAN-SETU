import express from 'express';
import { Cart } from '../MongoDB/buyerCartDB.mjs';

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ buyerId: req.user.id }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ buyerId: req.user.id });
        if (!cart) {
            cart = new Cart({ buyerId: req.user.id, items: [] });
        }
        cart.items.push({ productId, quantity });
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    try {
        const cart = await Cart.findOne({ buyerId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const router = express.Router();


router.get('/api/cart', getCart);
router.post('/api/cart/addProduct', addToCart);
router.delete('/api/cart/:productId', removeFromCart);


export default router;