import React, { useState, useEffect } from "react";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import "./App.css";

function App() {
  const [venueStartTime, setVenueStartTime] = useState(
    new Date("2023-10-10T08:00:00")
  );
  const [venueEndTime, setVenueEndTime] = useState(
    new Date("2023-10-10T02:00:00")
  );
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [orderId, setOrderId] = useState(1);
  const [orders, setOrders] = useState([]);
  const [amount, setAmount] = useState("");

  // Update orderId based on current date/time
  useEffect(() => {
    if (currentDateTime >= venueStartTime && currentDateTime <= venueEndTime) {
      setOrderId(orders.length + 1); // Set new orderId based on current orders
    } else {
      setOrderId(1); // Reset the order ID if outside of venue hours
    }
  }, [currentDateTime, venueStartTime, venueEndTime, orders]);

  const handleTimeChange = (e) => {
    setCurrentDateTime(new Date(e.target.value));
  };


  return (
    <div className="App">
      <h1>Restaurant Order Management</h1>

      <div className="time-picker">
        <label>Current Date/Time: </label>
        <input
          type="datetime-local"
          value={currentDateTime.toISOString().slice(0, 16)}
          onChange={handleTimeChange}
        />
      </div>

      <div className="time-range">
        <div>
          <label>Venue Start Time: </label>
          <input
            type="time"
            value={venueStartTime.toISOString().slice(11, 16)}
            onChange={(e) =>
              setVenueStartTime(new Date(`2023-10-10T${e.target.value}:00`))
            }
          />
        </div>
        <div>
          <label className="labal3">Venue End Time: </label>
          <input
            type="time"
            value={venueEndTime.toISOString().slice(11, 16)}
            onChange={(e) =>
              setVenueEndTime(new Date(`2023-10-10T${e.target.value}:00`))
            }
          />
        </div>
      </div>

      <OrderForm
        setAmount={setAmount}
        amount={amount}
        setOrders={setOrders}
      />
      <OrderList orders={orders} />
    </div>
  );
}

export default App;
