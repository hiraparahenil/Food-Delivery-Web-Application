import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });

    await newOrder.save();

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery charges"
        },
        unit_amount: 2 * 100 * 80
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log("Place Order Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Verifying order payment status & clearing cart upon success
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  
  try {
    // Basic validation check
    if (!orderId) {
      return res.json({ success: false, message: "Missing order ID" });
    }

    if (success === "true" || success === true) {
      // Find the order first
      const order = await orderModel.findByIdAndUpdate(orderId, { payment: true });
      
      // Safety check to ensure order exists before clearing cart
      if (order && order.userId) {
        await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
        return res.json({ success: true, message: "Paid" });
      } else {
        return res.json({ success: false, message: "Order not found" });
      }
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log("Verify Order Error:", error);
    return res.json({ success: false, message: "Error verifying order" });
  }
};

// Fetch user orders for frontend "My Orders" page
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("User Orders Error:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

export { placeOrder, verifyOrder, userOrders };