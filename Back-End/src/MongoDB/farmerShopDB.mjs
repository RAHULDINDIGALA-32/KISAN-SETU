import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    productImage:{
        type: mongoose.Schema.Types.String,
        required: true
    },

    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },

    quantity: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    sales:{
        type: mongoose.Schema.Types.Number,
        default: 0
    }

    
});

const farmerShopSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [productSchema]
});

export const FarmerShop = mongoose.model("FarmerShop", farmerShopSchema);
export const Product = mongoose.model("Product", productSchema); 