import Order from "../models/Order.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { customerName, email, phone, address, items, subtotal, shipping, total } = req.body;

    if (!customerName || !email || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      customerName,
      email,
      phone,
      address,
      items,
      subtotal,
      shipping,
      total,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders (optional, admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
