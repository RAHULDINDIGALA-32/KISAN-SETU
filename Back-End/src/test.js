import express from 'express';
import bodyParser from 'body-parser';
import testRoute from './routes/test.js'; // Adjust the path to match the actual file name
import connectDB from './MongoDB/connect.js'; // Import the connectDB function

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', testRoute);

// Connect to MongoDB
const mongoURI = 'mongodb+srv://akashdeepakvarma:oKUmkUH8apkGBfmP@registration.py4yr.mongodb.net/?retryWrites=true&w=majority&appName=Registration';
connectDB(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    res.send('Hello World!')
});