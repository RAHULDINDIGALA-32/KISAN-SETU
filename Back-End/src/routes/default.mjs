import express from 'express';
import { FarmerShop } from '../MongoDB/farmerShopDB.mjs';
import { Community } from '../MongoDB/community.mjs';

export const getAllProducts = async (req, res) => {
    try {
        const shops = await FarmerShop.find(); 
        const products = shops.flatMap(shop => shop.products); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getTrendingProducts = async (req, res) => {
    try {
        const shops = await FarmerShop.find();
        const allProducts = shops.flatMap(shop => shop.products);
        const trendingProducts = allProducts.filter(product => product.sales > 60);

        res.status(200).json(trendingProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const getAllPosts = async (req, res) => {
    try {
        const community = await Community.find(); 
        const posts = community.flatMap(comm => comm.posts);  
        res.status(200).json(posts);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const router = express.Router();


router.get('/api/products', getAllProducts);
router.get('/api/products/trending', getTrendingProducts);
router.get('/api/community/posts', getAllPosts);

export default router;