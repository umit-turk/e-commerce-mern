const express = require("express");
const {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
} = require("../controllers/product.js");
const { authenticationMid, roleChecked } = require("../middleware/auth.js");

const router = express.Router();

router.get("/products", allProducts);
router.get("/admin/products", authenticationMid, roleChecked("admin"), adminProducts);
router.get("/products/:id", detailProduct);
router.post("/product/new", authenticationMid, roleChecked("admin"), createProduct);
router.delete("/products/:id", authenticationMid, roleChecked("admin"), deleteProduct);
router.put("/products/:id", authenticationMid, roleChecked("admin"), updateProduct);
router.post("/products/newReview", authenticationMid, createReview);

module.exports = router;
