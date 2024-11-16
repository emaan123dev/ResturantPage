import { Router } from "express";
import {
  addOrder,
  getAllOrders,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.route("/add-order").post(addOrder);
orderRouter.route("/get-orders").get(getAllOrders);

//Secured routes


export default orderRouter;
