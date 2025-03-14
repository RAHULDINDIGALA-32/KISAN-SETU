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
import { Community } from '../MongoDB/community.mjs';

mongoose.connect('mongodb://localhost/KisanSetu-server', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const posts = [
    {
        text: 'How to grow organic tomatoes?',
        image: 'https://in.images.search.yahoo.com/images/view;_ylt=Awr1QQ1ZmalnE9YAaAi9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzc1NzIwYTlmZWI5NTdmNzcyOGMxNGQ2OGEzMmIyNzQ5BGdwb3MDNDQEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3DHow%2Bto%2Bgrow%2Borganic%2Btomatoes%253F%26type%3DE210IN885G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D44&w=3024&h=2013&imgurl=www.thespruce.com%2Fthmb%2F8K-JLbxy5pBfl0KeUqMgCMQb27o%3D%2F3024x0%2Ffilters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29%2Fgrowing-tomatoes-1403296-01-e87fc6443b55423890448cabb12efeba.jpg&rurl=https%3A%2F%2Fwww.thespruce.com%2Fgrowing-tomatoes-1403296&size=248KB&p=How+to+grow+organic+tomatoes%3F&oid=75720a9feb957f7728c14d68a32b2749&fr2=piv-web&fr=mcafee&tt=Everything+You+Need+to+Know+About+Growing+Tomatoes&b=0&ni=21&no=44&ts=&tab=organic&sigr=1iiUdnLZsQCn&sigb=TCAjP8CHxN0s&sigi=Vqoz25RX6ElD&sigt=807_H0iPaaR.&.crumb=PtKIIR0PZvN&fr=mcafee&fr2=piv-web&type=E210IN885G0',
        upvotes: 10,
        downvotes: 2,
    },
    {
        text: 'Best practices for sustainable farming',
        image: 'https://www.environmentbuddy.com/wp-content/uploads/2020/12/Sustainable-Farming-Methods-Practices-Infographic.jpg',
        upvotes: 20,
        downvotes: 1,
    },
    {
        text: 'How to deal with pests naturally?',
        image: 'https://in.images.search.yahoo.com/images/view;_ylt=AwrKEYOdmaln6H8p8.q9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzljMGQzYjcyZDVmODlhODFhNzkxNDUxOTE3YTFhM2UxBGdwb3MDNDUEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3DHow%2Bto%2Bdeal%2Bwith%2Bpests%2Bnaturally%253F%26ei%3DUTF-8%26type%3DE210IN885G0%26fr%3Dmcafee%26fr2%3Dp%253As%252Cv%253Ai%252Cm%253Asb-top%26tab%3Dorganic%26ri%3D45&w=1200&h=630&imgurl=plantcaretoday.com%2Fwp-content%2Fuploads%2Forganic-natural-pest-control-t1-min.jpeg&rurl=https%3A%2F%2Fplantcaretoday.com%2Fneem-oil-for-plants.html&size=33KB&p=How+to+deal+with+pests+naturally%3F&oid=9c0d3b72d5f89a81a791451917a1a3e1&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&fr=mcafee&tt=Neem+Oil+Insecticide%3A+Natural+Pesticide+For+Plants&b=0&ni=160&no=45&ts=&tab=organic&sigr=GquFncA7ca3f&sigb=YfSAcKBtYfvN&sigi=XgfWEmdfSOC0&sigt=Cr7OLbb30SBa&.crumb=PtKIIR0PZvN&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&type=E210IN885G0',
        upvotes: 15,
        downvotes: 3,
    },
    {
        text: 'Effective irrigation techniques for small farms',
        image: 'https://in.images.search.yahoo.com/images/view;_ylt=AwrKBJTImaln1YErwUa9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2NiMDI4MDM3Zjc2NTc2Y2U1NTA2YTEzYzJiMTg1YWE4BGdwb3MDNARpdANiaW5n?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3DEffective%2Birrigation%2Btechniques%2Bfor%2Bsmall%2Bfarms%26ei%3DUTF-8%26type%3DE210IN885G0%26fr%3Dmcafee%26fr2%3Dp%253As%252Cv%253Ai%252Cm%253Asb-top%26tab%3Dorganic%26ri%3D4&w=1170&h=761&imgurl=cropaia.com%2Fwp-content%2Fuploads%2FFurrow-irrigation.jpg&rurl=https%3A%2F%2Fcropaia.com%2Fblog%2Firrigation-system-design%2F&size=486KB&p=Effective+irrigation+techniques+for+small+farms&oid=cb028037f76576ce5506a13c2b185aa8&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&fr=mcafee&tt=Principles+of+irrigation+systems+design+%7C+Cropaia&b=0&ni=160&no=4&ts=&tab=organic&sigr=Nv635IkYVWVp&sigb=VIR7WHwlftfh&sigi=Nu61swLqI2Nv&sigt=mELNmOUayM6Y&.crumb=PtKIIR0PZvN&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&type=E210IN885G0',
        upvotes: 25,
        downvotes: 5,
    },
    {
        text: 'Composting 101: How to make your own compost',
        image: 'https://example.com/compost.jpg',
        upvotes: 30,
        downvotes: 4,
    },
    {
        text: 'The benefits of crop rotation',
        image: 'https://example.com/crop-rotation.jpg',
        upvotes: 18,
        downvotes: 2,
    },
    {
        text: 'How to start a small organic farm',
        image: 'https://example.com/organic-farm.jpg',
        upvotes: 22,
        downvotes: 3,
    },
    {
        text: 'Using cover crops to improve soil health',
        image: 'https://tse3.mm.bing.net/th?id=OIP.jZNPcVP8yNybQCDE5CwAOQHaGN&pid=Api&P=0&h=180',
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