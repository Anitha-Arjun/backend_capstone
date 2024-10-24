import { Router } from "express";
import Order from "../model/order.js";

const router = new Router();

// router.get("/", (req, res) => {
//   res.send("Order routes");
// });

/**
 * GET api/orders/
 */
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

/**
 * GET /api/orders/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const orderById = await Order.findById(req.params.id);

    if (orderById) {
      res.json(orderById);
    } else {
      res.status(404).json(`${req.params.id} is not found`);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST api/orders/
 */

router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    if (newOrder) {
      res.json(newOrder);
    } else {
      res.json("Cannot create a new order");
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/orders/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);
    if (deleteOrder) {
      res.json({
        message: `Order deleted: ${req.params.id}`,
        deleteOrder,
      });
    } else {
      res.json(`Error deleting the order: ${req.params.id}`);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/orders/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updateOrder) {
      res.json({
        message: `Order updated: ${req.params.id}`,
        updateOrder,
      });
    } else {
      res.json(`Error updating the order: ${req.params.id}`);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
