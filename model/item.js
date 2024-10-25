import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
  item_id: {
    type: mongoose.Types.ObjectId,
    ref: "Item",
  },
  product_id: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Item = new mongoose.model("Item", itemSchema);
export default Item;
