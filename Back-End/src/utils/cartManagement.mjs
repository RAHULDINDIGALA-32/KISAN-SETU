import express from 'express';
import { Cart } from '../MongoDB/buyerCartDB.mjs';

{/*
const getCart = async (req, res) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });

        const cart = await Cart.findOne({ buyerId: req.user.id }).populate('baskets.items.productId');

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const basketsWithTotal = cart.baskets.map(basket => ({
            _id: basket._id,
            basketName: basket.basketName,
            items: basket.items,
            totalPrice: basket.items.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0)
        }));

        res.status(200).json({ baskets: basketsWithTotal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBasket = async (req, res) => {
    const { basketName } = req.body;
    if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    try {
        let cart = await Cart.findOne({ buyerId: req.user.id });
        if (!cart) cart = new Cart({ buyerId: req.user.id, baskets: [] });

        if (cart.baskets.some(b => b.basketName === basketName)) {
            return res.status(400).json({ message: 'Basket with this name already exists' });
        }

        const newBasket = { basketName, items: [] };
        cart.baskets.push(newBasket);
        await cart.save();

        res.status(201).json(newBasket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 */}

 {/*

 const getCart = async (req, res) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });

        const cart = await Cart.findOne({ buyerId: req.user.id })
            .populate({ path: 'baskets.items.productId', select: 'productName price productImage' });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const basketsWithTotal = cart.baskets.map(basket => ({
            _id: basket._id,
            basketName: basket.basketName,
            items: basket.items,
            totalPrice: basket.items.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0) // Calculate total price
        }));

        res.status(200).json({ baskets: basketsWithTotal });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: error.message });
    }
};

export const createBasket = async (req, res) => {
    const { basketName } = req.body;
    if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    try {
        let cart = await Cart.findOne({ buyerId: req.user.id });
        if (!cart) cart = new Cart({ buyerId: req.user.id, baskets: [] });

        if (cart.baskets.some(b => b.basketName === basketName)) {
            return res.status(400).json({ message: 'Basket with this name already exists' });
        }

        const newBasket = { basketName, items: [] };
        cart.baskets.push(newBasket);
        await cart.save();

        res.status(201).json(newBasket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const addToBasket = async (req, res) => {
    const { productId, quantity, basketId } = req.body;
    if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    try {
        let cart = await Cart.findOne({ buyerId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        let basket = cart.baskets.id(basketId);
        if (!basket) return res.status(404).json({ message: 'Basket not found' });

        const existingItem = basket.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            basket.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(201).json({ message: 'Item added to basket', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromBasket = async (req, res) => {
    const { basketId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ buyerId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const basket = cart.baskets.id(basketId);
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }

        basket.items = basket.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBasket = async (req, res) => {
    const { basketId } = req.params;

    try {
        const cart = await Cart.findOne({ buyerId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.baskets = cart.baskets.filter(basket => basket._id.toString() !== basketId);
        await cart.save();

        res.status(200).json({ message: 'Basket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ buyerId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.baskets = [];
        await cart.save();

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const router = express.Router();

router.get('/api/cart', getCart);
router.post('/api/cart/createBasket', createBasket); 
router.post('/api/cart/addToBasket', addToBasket);
router.delete('/api/cart/remove/:basketId/:productId', removeFromBasket);
router.delete('/api/cart/deleteBasket/:basketId', deleteBasket);
router.delete('/api/cart/clear', clearCart);

export default router;

 //calculateBasketTotal(basket)

*/ }

const router = express.Router();

// Helper function to calculate total for a basket
const calculateBasketTotal = (basket) => {
    return basket.items.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  };
  
  // GET /api/cart - Get all baskets with totals
  router.get('/api/cart', async (req, res) => {
    try {
      if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
  
      const cart = await Cart.findOne({ buyerId: req.user.id })
        .populate('baskets.items.productId', 'productName price productImage');
  
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      const baskets = cart.baskets.map((basket) => ({
        _id: basket._id,
        basketName: basket.basketName,
        items: basket.items.map(item => ({
          ...item.toObject(),
          productId: item.productId
        })),
        totalPrice: 40           
      }));

      console.log("baskets:",baskets);
  
      res.status(200).json({ baskets });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST /api/cart/createBasket
  router.post('/api/cart/createBasket', async (req, res) => {
    try {
      if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
      const { basketName } = req.body;
  
      let cart = await Cart.findOne({ buyerId: req.user.id });
      if (!cart) cart = new Cart({ buyerId: req.user.id, baskets: [] });
  
      if (cart.baskets.some(b => b.basketName === basketName)) {
        return res.status(400).json({ message: 'Basket name already exists' });
      }
  
      const newBasket = { basketName, items: [] };
      cart.baskets.push(newBasket);
      await cart.save();
  
      res.status(201).json(newBasket);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST /api/cart/addToBasket
  router.post('/api/cart/addToBasket', async (req, res) => {
    try {
      const { productId, quantity, basketId } = req.body;
      if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
  
      const cart = await Cart.findOne({ buyerId: req.user.id });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      const basket = cart.baskets.id(basketId);
      if (!basket) return res.status(404).json({ message: 'Basket not found' });
  
      const existingItem = basket.items.find(item => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        basket.items.push({ productId, quantity });
      }
  
      await cart.save();
      res.status(201).json({ message: 'Item added to basket' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // DELETE /api/cart/remove/:basketId/:productId
  router.delete('/api/cart/remove/:basketId/:productId', async (req, res) => {
    try {
      const { basketId, productId } = req.params;
      const cart = await Cart.findOne({ buyerId: req.user.id });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      const basket = cart.baskets.id(basketId);
      if (!basket) return res.status(404).json({ message: 'Basket not found' });
  
      basket.items = basket.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
  
      res.status(200).json({ message: 'Item removed from basket' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // DELETE /api/cart/deleteBasket/:basketId
  router.delete('/api/cart/deleteBasket/:basketId', async (req, res) => {
    try {
      const { basketId } = req.params;
      const cart = await Cart.findOne({ buyerId: req.user.id });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      cart.baskets = cart.baskets.filter(b => b._id.toString() !== basketId);
      await cart.save();
  
      res.status(200).json({ message: 'Basket deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // DELETE /api/cart/clear
  router.delete('/api/cart/clear', async (req, res) => {
    try {
      const cart = await Cart.findOne({ buyerId: req.user.id });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      cart.baskets = [];
      await cart.save();
  
      res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;