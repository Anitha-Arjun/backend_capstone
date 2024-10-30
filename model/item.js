import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    require: true,
  },
  product_name: {
    type: String,
    required: true,
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
