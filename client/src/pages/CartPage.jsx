import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated")); // Sync navbar
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((i) => i._id !== id);
    updateCart(updated);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const subtotal = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="p-6 max-w-4xl mx-auto pt-6">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity controls */}
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="px-3 py-1 border rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="mt-10 p-6 border rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between text-lg mb-4">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <hr className="my-4" />

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
              onClick={() => navigate("/checkout")} 
              className="w-full py-3 bg-black text-white rounded-md">
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full py-3 bg-red-500 text-white rounded-md"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
