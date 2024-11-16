import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const addOrder = asyncHandler(async (req, res) => {
  const { orderAmount } = req.body;

  if (!orderAmount) {
    throw new apiError(
      400,
      "Order Amount fields are required"
    );
  }

  const orderCreated = await Order.create({
    orderAmount,
   });
  if (!orderCreated) {
    throw new apiError("Failed to create order", 500);
  }
  return res
    .status(200)
    .json(new apiResponse(200, orderCreated, "Order Created To database"));
});
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the collection
    if (!orders.length) {
      throw new apiError(404, "No orders found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, orders, "Orders fetched successfully"));
  } catch (err) {
    throw new apiError(err.statusCode || 500, err.message || "Internal Server Error");
  }
});

export { addOrder,getAllOrders };
