import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/v1/orders/get-orders"
        );
        setOrders(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-list">
      <h2>Order List</h2>

      {loading && <p>Loading orders...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && orders.length === 0 ? (
        <p className="pp">No orders yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>${order.orderAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
