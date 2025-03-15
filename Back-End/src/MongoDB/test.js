import mongoose from 'mongoose';
//import bcrypt from 'bcrypt'; // for password hashing

const { Schema } = mongoose;

// BankDetails Schema (For Farmers Only)
const bankDetailsSchema = new Schema({
    ifscCode: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    }
});

// User Schema (Common fields for both Farmers and Buyers)
const userSchema = new Schema({
    userType: {
        type: String,
        required: true,
        enum: ['farmer', 'buyer'], // Only 'farmer' or 'buyer'
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // password length validation
    },
    // Reference to BankDetails (only for farmers)
    bankDetails: {
        type: Schema.Types.ObjectId,
        ref: 'BankDetails',
        required: function() {
            return this.userType === 'farmer'; // Bank details required only for farmers
        }
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
}, { timestamps: true });

// Password hashing middleware
// userSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
// });

// Export schemas
const BankDetails = mongoose.model('BankDetails', bankDetailsSchema);
const User = mongoose.model('User', userSchema);

export { User, BankDetails };
