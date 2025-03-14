import  createApp  from "./utils/myApp.mjs";
import mongoose from "mongoose";

mongoose
	.connect("mongodb://localhost/KisanSetu-server",)
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(`Error: ${err}`));

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Running on Port ${PORT}`);
});



