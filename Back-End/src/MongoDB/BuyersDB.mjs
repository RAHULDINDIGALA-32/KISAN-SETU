import mongoose from "mongoose";

const BuyerSchema =  new mongoose.Schema({
    Address:{
        type: mongoose.Schema.Types.String,
        required: true,
    
    },

    Gender:{
        type: mongoose.Schema.Types.String,
        required: true,
        enum: ["Male", "Female"]
    },

    phoneNo:{
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'User',
        unique: true
    
    },

    dateOfBirth: {
        type: mongoose.Schema.Types.Date,
        required: true
    },

    email_id:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }
});


export const Buyer= mongoose.model("Buyer",BuyerSchema);