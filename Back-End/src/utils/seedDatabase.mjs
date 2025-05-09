{/*
import mongoose from 'mongoose';
import { User } from '../MongoDB/usersDB.mjs';
import { FarmerShop } from '../MongoDB/farmerShopDB.mjs';

mongoose
    .connect("mongodb://localhost/KisanSetu-server",)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(`Error: ${err}`));


const products = [
    {
        productName: 'Tomatoes',
        productImage: 'https://tagawagardens.com/wp-content/uploads/2023/08/TOMATOES-RED-RIPE-VINE-SS-1-scaled.jpg',
        price: 20,
        quantity: 100,
        description: 'Fresh Organically cultivated tomatoes',
        sales: 194
    },
    {
        productName: 'Potatoes',
        productImage: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/ee1346d7-0b07-43f8-831b-6911c8cc7494.jpg?ts=1737027129',
        price: 15,
        quantity: 200,
        description: 'Savor the goodness of our organically grown potatoes. Rich in nutrients and fiber, they support digestion and provide sustained energy. Enjoy their versatility and health benefits in your favorite dishes.',
        sales: 95
    },
    {
        productName: 'Carrots',
        productImage: 'https://www.knowyourproduce.com/wp-content/uploads/2022/08/how-to-grow-carrots-2.png',
        price: 25,
        quantity: 150,
        description: 'Fresh carrots',
        sales: 76
    },
    {
        productName: 'Papayya',
        productImage: 'https://rukminim2.flixcart.com/image/612/612/xif0q/plant-seed/x/i/x/200-papaya-seed-200-sree-original-imagrk4hqhgejeca.jpeg?q=70',
        price: 40,
        quantity: 100,
        description: 'These are very good and high quality seeds, These seeds are produced in our own nursery, The seedlings produced from these seeds are of excellent quality , Total seeds quality 40 pcs per packet.',
        sales: 62
    },
    {
        productName: 'Broccoli',
        productImage: 'https://rukminim2.flixcart.com/image/612/612/xif0q/plant-seed/l/n/u/100-combo-pack-of-organic-seeds-yi-saler-original-imagh6psgjzjhha5.jpeg?q=70',
        price: 47,
        quantity: 200,
        description: 'Organic Seeds of 4 Vegetables Cabbage (patta gobhi), Cauliflower (Puool Gobhi), lump cabbage (Ganth Gobhi) & Broccoli Seeds are of very good quality and with high germination rate. Very Easy to grow. Can also be grow on terrace garden.',
        sales: 95
    },
    {
        productName: 'Raw Turmeric',
        productImage: 'https://rukminim2.flixcart.com/image/612/612/xif0q/plant-seed/q/l/1/100-winter-season-premium-100-germination-hybrid-organic-pea-original-imag9qd8fy3hv9g6.jpeg?q=70',
        price: 137,
        quantity: 150,
        description: 'Raw turmeric, scientifically known as Curcuma longa, is a rhizomatous herbaceous perennial plant with a distinct earthy fragrance and a vibrant orange-yellow color. It is a key ingredient in many cuisines and traditional medicines.',
        sales: 56
    },
];

const seedDatabase = async () => {
    try {
        const farmers = await User.find({ userType: 'Farmer' });

        for (const farmer of farmers) {
            let shop = await FarmerShop.findOne({ farmerId: farmer._id });
            if (!shop) {
                shop = new FarmerShop({ farmerId: farmer._id, products: [] });
            }
            shop.products.push(...products);
            await shop.save();
        }

        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedDatabase();

*/}

import mongoose from 'mongoose';
import { User } from '../MongoDB/usersDB.mjs';
import { Community } from '../MongoDB/communityDB.mjs';

mongoose.connect('mongodb://localhost/KisanSetu-server', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const posts = [
    {
      text: 'How to grow organic tomatoes?',
      image: 'https://drearth.com/wp-content/uploads/tomato-iStock-174932787.jpg',
      upvotes: 10,
      downvotes: 2,
    },
    {
      text: 'Best practices for sustainable farming',
      image: 'https://mitraweb.in/blogs/wp-content/uploads/2024/07/seven-reasone.jpg',
      upvotes: 20,
      downvotes: 1,
    },
    {
      text: 'How to deal with pests naturally?',
      image: 'https://plantcaretoday.com/wp-content/uploads/organic-natural-pest-control-t1-min.jpeg',
      upvotes: 15,
      downvotes: 3,
    },
    {
      text: 'Effective irrigation techniques for small farms',
      image: 'https://cropaia.com/wp-content/uploads/Furrow-irrigation.jpg',
      upvotes: 25,
      downvotes: 5,
    },
    {
      text: 'Composting 101: How to make your own compost',
      image: 'https://www.ecepl.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-05-at-12.53.05-PM-2.jpeg',
      upvotes: 30,
      downvotes: 4,
    },
    {
      text: 'The benefits of crop rotation',
      image: 'https://unicropbiochem.com/wp-content/uploads/2024/09/56.webp',
      upvotes: 18,
      downvotes: 2,
    },
    {
      text: 'How to start a small organic farm',
      image: 'https://static-web.upmetrics.co/wp-content/uploads/2022/07/02092416/organic-farm-business-plan.png',
      upvotes: 22,
      downvotes: 3,
    },
    {
      text: 'Using cover crops to improve soil health',
      image: 'https://wilkes.ces.ncsu.edu/wp-content/uploads/2014/12/crop-rotation.jpg',
      upvotes: 16,
      downvotes: 1,
    },
  ];
  

const seedCommunityDatabase = async () => {
    try {

        const users = await User.find();

   
        await Community.deleteMany({});

  
        for (const user of users) {
            const community = new Community({
                posts: posts.map(post => ({
                    ...post,
                    userId: user._id,
                })),
            });
            await community.save();
        }

        console.log('Community database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding community database:', error);
        mongoose.connection.close();
    }
};

seedCommunityDatabase();