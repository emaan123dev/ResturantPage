import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    orderAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Order = model("Order", orderSchema);
