const express = require("express");
const app = express();
const productManager = require("./productManager");

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (err) {
    console.error(err);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    if (typeof product === "string") {
      console.log(`Product not found or incorrect id`);
    } else {
      res.json(product);
    }
  } catch (err) {
    console.error(err);
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
