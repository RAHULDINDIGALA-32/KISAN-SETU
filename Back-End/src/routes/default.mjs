import express from 'express';
import { FarmerShop } from '../MongoDB/farmerShopDB.mjs';
import { Community } from '../MongoDB/communityDB.mjs';
import { isAuthenticated } from '../routes/auth.mjs';

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

export const addPost = async (req, res) => {
    const { text, image } = req.body;
    try {
        const community = await Community.findOne();
        const newPost = {
            text,
            image,
            userId: req.user._id
        };
        community.posts.push(newPost);
        await community.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const upvotePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const community = await Community.findOne();
        const post = community.posts.id(postId);
        post.upvotes += 1;
        await community.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const downvotePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const community = await Community.findOne();
        const post = community.posts.id(postId);
        post.downvotes += 1;
        await community.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addComment = async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    try {
        const community = await Community.findOne();
        const post = community.posts.id(postId);
        const newComment = {
            text,
            userId: req.user._id
        };
        post.comments.push(newComment);
        await community.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const router = express.Router();

router.get('/api/products', getAllProducts);
router.get('/api/products/trending', getTrendingProducts);
router.get('/api/community/posts', getAllPosts);
router.post('/api/community/posts', isAuthenticated, addPost);
router.post('/api/community/posts/:postId/upvote', isAuthenticated, upvotePost);
router.post('/api/community/posts/:postId/downvote', isAuthenticated, downvotePost);
router.post('/api/community/posts/:postId/comments', isAuthenticated, addComment);

export default router;