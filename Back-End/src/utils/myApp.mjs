import express from "express";
import cors from 'cors';
import rootRouter from "../routes/root.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo"
import mongoose from "mongoose";
import "../auth_strategies/local.mjs"



export default function createApp() {
	const app = express();
    app.use(cors());
	app.use(express.json());
	app.use(cookieParser("KisanSetu"));
	app.use(session({
        secret: "#KisanSetu@SIH2024",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
        
        
    }));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(rootRouter);
    
  app.get("/", (req, res) => {
     res.cookie("Theme","Dark");
    res.status(202).send("Hello there!! Welcome to KISAN SETU");
   })

	return app;
}