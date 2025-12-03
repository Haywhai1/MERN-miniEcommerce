import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState("");

  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(saved);
  }, []);

  // Toast helper
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  // Update localStorage & navbar badge
  const updateCart = (newCart, message) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
    if (message) showToast(message);
  };

  const increaseQty = (id) => {
    const newCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart, "Quantity increased");
  };

  const decreaseQty = (id) => {
    const newCart = cartItems
      .map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(newCart, "Quantity decreased");
  };

  const removeItem = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    updateCart(newCart, "Item removed");
  };

  // Cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping;

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !email || !phone || !address) {
    alert("Please fill all fields");
    return;
  }

  try {
    const items = cartItems.map((item) => ({
      productId: item._id, // map _id to productId
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: name,
        email,
        phone,
        address,
        items,
        subtotal,
        shipping,
        total,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Something went wrong");

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    setSubmitted(true);
  } catch (error) {
    alert(error.message);
  }
};


  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p>Your order has been successfully placed.</p>
        <button
          className="mt-6 px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md relative">
      {/* Toast Notification */}
      {toast && (
        <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-md shadow-md animate-bounce">
          {toast}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cart Summary */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-2 border-b pb-2 transition-transform duration-200 hover:scale-105"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Item total & remove */}
                  <div className="flex flex-col items-end">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="mt-1 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-3" />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-400 px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-400 px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-400 px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-400 px-3 py-2 rounded-md"
                  rows={3}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
