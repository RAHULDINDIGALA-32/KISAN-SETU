{/*
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

*/}


// Backend: Buyer Cart Routes (Updated for full cart management)
import express from 'express';
import { Cart } from '../MongoDB/buyerCartDB.mjs';

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ buyerId: req.user.id }).populate('items.productId');
        if (!cart) {
            return res.status(200).json({ items: [], totalPrice: 0 }); 
        }
        const totalPrice = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
        res.status(200).json({ ...cart._doc, totalPrice });
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
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
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

export const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ buyerId: req.user.id });
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const router = express.Router();

router.get('/api/cart', getCart);
router.post('/api/cart/addProduct', addToCart);
router.delete('/api/cart/remove/:productId', removeFromCart);
router.delete('/api/cart/clear', clearCart);

export default router;
