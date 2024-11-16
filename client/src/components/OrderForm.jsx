import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ amount, setAmount, setOrders}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addOrder = async (orderAmount) => {
    try {
      setLoading(true); // Start loading
      setError(null); // Clear any previous errors

      // Correctly format the Axios request
      const response = await axios.post(
        "http://localhost:3000/api/v1/orders/add-order",
        { orderAmount }, // JSON payload
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON content type
          },
        }
      );

      console.log("Order created successfully:", response.data.data);

      // Append the new order to the existing orders array
      setOrders((prevOrders) => [...prevOrders, response.data.data]);
    } catch (err) {
      console.error("Error creating order:", err.message);
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    addOrder(amount);
    setAmount("");
  };
  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2 className="create-order">Create Order</h2>
      <label className="order-amount">Order Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter order amount"
        min="1"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating Order..." : "Create Order"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default OrderForm;
