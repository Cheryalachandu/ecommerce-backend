import express from "express"
import dataBaseConnection from "./server.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import cors from "cors"

const app = express();
dataBaseConnection();

const port = process.env.PORT || 8080;


app.use(cors())

app.use(express.json())
app.use("/products", productsRouter);
app.use("/cart", cartRouter)

app.listen(port, () => {
    console.log(`server running in ${port}`)
})