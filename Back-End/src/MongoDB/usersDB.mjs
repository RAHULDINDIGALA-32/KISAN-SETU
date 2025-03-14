import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    userType:{
        type: mongoose.Schema.Types.String,
        required: true,
    
    },

    userName:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    
    },

    phoneNo:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    
    },
   
    password:{
        type: mongoose.Schema.Types.String,
        required: true
    }
});


export const User= mongoose.model("User",userSchema);