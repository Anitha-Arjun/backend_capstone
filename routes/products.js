import { Router } from "express";
import Product from "../model/product.js";

const router = new Router();

// router.get("/", (req, res) => {
//   res.send("product details");
// });

/**
 * GET api/products/
 */
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const productById = await Product.findById(req.params.id);
    if (productById) {
      res.json(productById);
    } else {
      res.status(404).json(`${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/products/
 */
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);

    if (newProduct) {
      res.json(newProduct);
    } else {
      res.status(404).json({ message: "Error creating a new product" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/products/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteById = await Product.findByIdAndDelete(req.params.id);
    if (deleteById) {
      res.json({
        message: `Product deleted: ${req.params.id}`,
        deleteById,
      });
    } else {
      res.json({ message: "Error in deleting the product by ID" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/products/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateById = await Product.findByIdAndUpdate(id, body);
    if (updateById) {
      res.json({
        message: `Product updated: ${req.params.id}`,
        updateById,
      });
    } else {
      res.status(404).json(`Cannot update:${id} `);
    }
  } catch (error) {
    next(error);
    // console.log(error`missing ${id}  to update`);
  }
});


/**
 * DELETE the quantity by id
 */
router.delete('/:id', async(req, res, next) => {
  try {
    const getById = await Product.findById(req.param.id);
    if(getById){
     const productId = await Product.find(Product.product_id);
    }
  } catch (error) {
    
  }
})

export default router;
