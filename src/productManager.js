const fs = require("fs");

class ProductManager {
  constructor() {
    if (fs.existsSync("./src/products.json")) {
      this.products = JSON.parse(
        fs.readFileSync("./src/products.json", "utf-8")
      );
    } else {
      this.products = [];
    }
  }

  getProducts() {
    try {
      const productsData = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(`./src/products.json`, productsData);
    } catch (err) {
      console.log(err);
    }
    return this.products;
  }

  getProductById(id) {
    const productId = Number(id);
    const product = this.products.find((product) => product.id === productId);
    if (!product || id > this.products.length) {
      return `Product not found or incorrect id`;
    }

    return product;
  }

  addProduct(code) {
    const precioBaseDeGanancia = 1.15;

    if (!this.products.find((product) => product.code === code)) {
      this.products.push({
        id: this.products.length + 1,
        title: `Test Product ${this.products.length + 1}`,
        description: "This is a test product",
        price: 200 * precioBaseDeGanancia,
        thumbnail: `No Image`,
        code: "abc123",
        stock: 25,
      });
      this.getProducts();
      console.log(`Product added`);
    } else {
      return "Product already exists";
    }
  }

  deleteProduct(id) {
    if (
      !this.products.find((product) => product.id === id) ||
      id === undefined ||
      typeof id !== "number"
    ) {
      return `the product you are trying to delete does not exist or the id is incorrect`;
    } else {
      this.products = this.products.filter((product) => product.id !== id);
      this.getProducts();
      return `Product deleted`;
    }
  }

  updateProduct(id, field, value) {
    const validFields = [
      "id",
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];

    if (!this.products.find((product) => product.id === id)) {
      return `Product not found or can't be updated`;
    } else if (!validFields.includes(field)) {
      return `Invalid field: ${field}`;
    } else {
      this.products = this.products.map((product) => {
        if (product.id === id) {
          product[field] = value;
          this.getProducts();
          console.log(`product updated successfully`);
        }
        return product;
      });
    }
    return this.products.find((product) => product.id === id);
  }
}

const productManager = new ProductManager();

module.exports = productManager;
