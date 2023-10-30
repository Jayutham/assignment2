const { Product, Category } = require("../models/product");

// Middleware function for handling errors
const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};

// Get all products or filter by name
const getProducts = (req, res) => {
  const nameSubstring = req.query.name;
  const query = nameSubstring
    ? { name: { $regex: nameSubstring, $options: "i" } }
    : {};

  Product.find(query)
    .then((products) => res.json(products))
    .catch((err) => handleErrors(res, err));
};

// Get a product by ID
const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => handleErrors(res, err));
};

// Create a new product
const createProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((product) => res.status(201).json(product))
    .catch((err) => handleErrors(res, err));
};

// Update a product by ID
const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => handleErrors(res, err));
};

// Delete a product by ID
const deleteProductById = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted" });
    })
    .catch((err) => handleErrors(res, err));
};

// Delete all products
const deleteAllProducts = (req, res) => {
  Product.deleteMany({})
    .then(() => res.json({ message: "All products deleted" }))
    .catch((err) => handleErrors(res, err));
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  deleteAllProducts,
};
