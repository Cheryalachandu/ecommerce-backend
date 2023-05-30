import express from "express"
import dataBaseConnection from "./server.js";
import productsRouter from "./routes/products.js";

const app = express();
dataBaseConnection();

const port = process.env.PORT || 8080;

app.use(express.json())
app.use("/products", productsRouter);

app.listen(port, () => {
    console.log(`server running in ${port}`)
})