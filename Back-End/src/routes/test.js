import express from 'express';
import { User, BankDetails } from '../MongoDB/test.js'; // Adjust the path as necessary

const router = express.Router();

// POST route to create a new User document
router.post('/user', async (req, res) => {
    try {
        const { userType, userName, phoneNumber, email, password, bankDetails, address, gender, dob } = req.body;

        // Validate required fields
        if (!userType || !userName || !phoneNumber || !email || !password || !address || !gender || !dob) {
            return res.status(400).send({ message: 'All fields are required!' });
        }

        // If the user is a farmer, ensure that bankDetails is provided
        if (userType === 'farmer' && (!bankDetails || !bankDetails.ifscCode || !bankDetails.branch || !bankDetails.accountNumber)) {
            return res.status(400).send({ message: 'Bank details are required for farmers!' });
        }

        // Create bankDetails document if userType is farmer
        let savedBankDetails = null;
        if (userType === 'farmer') {
            const { ifscCode, branch, accountNumber } = bankDetails;
            savedBankDetails = new BankDetails({ ifscCode, branch, accountNumber });
            await savedBankDetails.save();
        }

        // Create new User document
        const newUser = new User({
            userType,
            userName,
            phoneNumber,
            email,
            password,
            address,
            gender,
            dob,
            bankDetails: savedBankDetails ? savedBankDetails._id : null, // Link bankDetails if farmer
        });

        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Error creating user', error: error.message });
    }
});

// GET route to retrieve all User documents
router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Error fetching users', error: error.message });
    }
});

// GET route to retrieve BankDetails

router.get('/bankDetails', async (req, res) => {
    try {
        const bankDetails = await BankDetails.find();
        res.status(200).send(bankDetails);
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Error fetching bank details', error: error.message });
    }
});

// DELETE route to delete a User document by ID
router.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Error deleting user', error: error.message });
    }
});

export default router;
