import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/db/connectDB";
import Payment from "@/models/Payment.model";
import User from "@/models/User.model";

export const POST = async (req) => {
  try {
    await connectDB();

    // Parse form data
    let body = await req.formData();
    body = Object.fromEntries(body);

    // Check if Razorpay Order ID is present on the server
    const order = await Payment.findOne({ orderId: body.razorpay_order_id })

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" });
    }

    const user = await User.findOne({ email: order.receiver })

    // Check if payment is valid
    const isValid = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      user.razorpaySecret
    );

    if (isValid) {
      // Payment verified successfully
      await Payment.findOneAndUpdate(
        { orderId: body.razorpay_order_id },
        { done: true },
        { new: true }
      );

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/${user.username}?paymentDone=true`
      );
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred during payment processing",
    });
  }
};
