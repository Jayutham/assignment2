const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/products", Controller.getProducts);
router.get("/products/:id", Controller.getProductById);
router.post("/products", Controller.createProduct);
router.put("/products/:id", Controller.updateProduct);
router.delete("/products/:id", Controller.deleteProductById);
router.delete("/products", Controller.deleteAllProducts);

module.exports = router;
