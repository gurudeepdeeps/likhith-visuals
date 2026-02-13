const Razorpay = require("razorpay");

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { amount, currency = "INR", receipt } = JSON.parse(event.body);

    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid amount" }),
      };
    }

    const razorpay = new Razorpay({
      key_id: "rzp_live_SFYqqjGhiIoOeV",
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount, // amount in paise
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      }),
    };
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Order creation failed" }),
    };
  }
};
