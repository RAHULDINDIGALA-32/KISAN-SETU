import { Router } from "express";
import authRouter from "./auth.mjs";
import farmerRouter from "./farmer.mjs";
import buyerRouter from "./buyers.mjs";
import deafultRouter from "./default.mjs";
import userRouter from "./user.mjs";


const router=Router();

router.use(authRouter);
router.use(farmerRouter);
router.use(buyerRouter);
router.use(deafultRouter);
router.use(userRouter);


export default router;