import { Router } from "express";
import authRouter from "./auth.mjs";
import farmerRouter from "./farmer.mjs";
import buyerRouter from "./buyers.mjs";
import deafultRouter from "./default.mjs";
import userRouter from "./user.mjs";
import cartRouter from "../utils/cartManagement.mjs"


const router=Router();

router.use(authRouter);
router.use(farmerRouter);
router.use(deafultRouter);
router.use(userRouter);
router.use(cartRouter);


export default router;