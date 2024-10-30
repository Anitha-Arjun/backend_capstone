import { Router } from "express";
import Order from "../model/order.js";
import Item from "../model/item.js";
import Product from "../model/product.js";

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
 * DELETE /api/orders/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    //finds the order by id and delete it
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
    //finds the order by id and update the changes to the order
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

/**
 * POST /api/orders/:id/items
 * @description create a item array for a specific order
 */
router.post("/:id/items", async (req, res, next) => {
  try {
    //find the order and add a new item
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ message: `Order not found: ${req.params.id}` });
    }

    // Validate - item data
    const { item_id, product_id, quantity } = req.body;
    if (!item_id || product_id == null || quantity == null) {
      return res.status(400).json({
        message: "Missing required item fields: item_id, product_id,quantity",
      });
    }
    //create an item
    const item = await Item.create(req.body);
    //push the item to the array in order
    order.items.push(item);
    //save order
    await order.save();

    res.status(201).json({ order });
  } catch (error) {
    console.error("Error adding item to order:", error);
    next(error);
  }
});

/**
 * POST api/orders/
 */

router.post("/", async (req, res, next) => {
  //session is created to start the transaction
  const session = await Order.startSession();
  session.startTransaction();
  try {
    const { order_id, total_amount, status, items } = req.body;

    //order is created
    const newOrder = new Order({
      order_id,
      total_amount,
      status,
      items,
    });
    //saved to db
    await newOrder.save({ session });
    // Update product quantities
    for (let item of items) {
      const product = await Product.findOne({
        product_id: item.product_id,
      }).session(session);
      //if the product doesn't exist throws an error
      if (!product) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }
      //checks whether the product quantity is less than the item quantity
      if (product.quantity < item.quantity) {
        throw new Error(
          `Insufficient stock for product: ${product.product_name}`
        );
      }
      //if the above conditions are true, product quantity will be reduced and changes will be saved.
      product.quantity -= item.quantity;
      await product.save({ session });
    }

    await session.commitTransaction();
    res
      .status(201)
      .json({ message: "Order created successfully and stock updated" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Failed to create order", error });
  } finally {
    session.endSession();
  }
});

export default router;
