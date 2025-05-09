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

const basketSchema = new mongoose.Schema({
    basketName: {
        type: String,
        required: true
    },
    items: [cartItemSchema]
});


const cartSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    baskets: [basketSchema]  
});

export const Cart = mongoose.model("Cart", cartSchema);
