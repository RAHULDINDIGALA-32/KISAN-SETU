import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FarmerShop',
        required: true
    },
    quantity: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema]
});

export const Cart = mongoose.model("Cart", cartSchema);