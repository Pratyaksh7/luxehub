const express = require("express");
const productsController = require("../controllers/products.controller");

const router = express.Router()
router.get("/ping", productsController.Ping)

router.post('/', productsController.createProduct)
router.get('/', productsController.listProducts)
router.put('/:productId', productsController.updateProduct)
router.get('/:productId', productsController.getAProduct);
router.delete('/:productId', productsController.deleteAProduct);







// Create/Update Product:

// Endpoint: /products
// Method: POST/PUT
// Description: Allows the addition or modification of product information. This includes details, categories, pricing, and any other relevant data.
// Get Product Details:

// Endpoint: /products
// Method: GET
// Description: Retrieves a list of products, possibly with optional parameters for filtering (e.g., by category, price range).
// Search Products:

// Endpoint: /products/search
// Method: POST
// Description: Supports advanced search functionality, allowing clients to search for products based on various criteria. The request body might include parameters like keywords, categories, and filters.
// Get Categories:

// Endpoint: /categories
// Method: GET
// Description: Retrieves a list of available product categories.
// Get Product Pricing:

// Endpoint: /products/{productId}/pricing
// Method: GET
// Description: Retrieves pricing information for a specific product.
// Delete Product:

// Endpoint: /products/{productId}
// Method: DELETE
// Description: Deletes a product from the catalog.

module.exports = router;