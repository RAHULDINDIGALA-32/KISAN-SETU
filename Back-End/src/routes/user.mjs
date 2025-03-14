import express from 'express';
import { User } from '../MongoDB/usersDB.mjs';
import { createUserValidationSchema } from '../utils/validationSchema.mjs';
import { checkSchema, validationResult } from 'express-validator';
import { hashPassword} from "../utils/encryption/userPassword.mjs";

const router = express.Router();


router.post('/api/register', checkSchema(createUserValidationSchema), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userType, userName, phoneNo, password } = req.body;

    try {
    
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
       
        const newUser = new User({
            userType,
            userName,
            phoneNo,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;