const express = require("express");
const productsController = require("../controllers/products.controller");

const router = express.Router()
router.get("/ping", productsController.Ping)

router.post('/', productsController.createProduct)
router.get('/', productsController.listProducts)
router.get('/categories', productsController.categoriesList)
router.put('/:productId', productsController.updateProduct)
router.get('/:productId', productsController.getAProduct);
router.delete('/:productId', productsController.deleteAProduct);
router.post('/search', productsController.searchProduct);

module.exports = router;