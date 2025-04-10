"use server";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDB";
import Payment from "@/models/Payment.model";
import User from "@/models/User.model";

export const initiate = async (data, id, secret) => {
  try {
    // Connect to the database
    await connectDB();
    // Create Razorpay instance
    let instance = new Razorpay({
      key_id: id,
      key_secret: secret,
    });

    // Prepare options for the order
    let options = {
      amount: Number.parseInt(data.amount) * 100, // Amount in paise
      currency: "INR", // Currency (INR for Indian Rupee)
    };

    // Create an order using Razorpay API
    let order = await instance.orders.create(options);

    // Create a payment record in the database with status "pending"
    await Payment.create({
      sender: data.name,
      senderEmail: data.SenderEmail,
      receiver: data.userEmail,
      orderId: order.id,
      amount: data.amount,
      message: data.message,
      done: false, // Status is initially set to false, indicating it's pending
    });

    // Return the Razorpay order ID for client-side use
    return order.id;
  } catch (error) {
    console.error("Error in initiating payment:", error);
  }
};

export const fetchUser = async (data) => {
  await connectDB();

  const user = await User.findOne({
    $or: [{ email: data }, { username: data }],
  }).lean();

  return user;
};

export const fetchPayment = async (email) => {
  await connectDB();

  const payment = await Payment.find({ receiver: email, done: true })
    .sort({ amount: -1 })
    .lean();

  let data = [];

  for (let i = 0; i < payment.length; i++) {
    data.push(payment[i]);

    let user = await User.findOne({ email: payment[i].senderEmail }).lean();

    if (user?.avatar !== "") {
      data[i]["image"] = user?.avatar;
    } else {
      data[i]["image"] = "";
    }
  }
  return data;
};

export const updateProfile = async (data) => {
  await connectDB();

  // Check if email is valid
  const emailAvailable = await User.findOne({ email: data.email });
  if (!emailAvailable) {
    return { message: "This Email does not exists" };
  }

  // Check if username is available
  const userNameAvailable = await User.findOne({ username: data.username });

  if (userNameAvailable && userNameAvailable.email !== data.email) {
    return { message: "Username already exists" };
  }

  let toUpdate = {};

  if (data.name) {
    toUpdate.name = data.name;
  }
  if (data.avatar) {
    toUpdate.avatar = data.avatar;
  }
  if (data.cover) {
    toUpdate.cover = data.cover;
  }
  if (data.razorpayID) {
    toUpdate.razorpayID = data.razorpayID;
  }
  if (data.razorpaySecret) {
    toUpdate.razorpaySecret = data.razorpaySecret;
  }
  if (data.username) {
    toUpdate.username = data.username;
  }
  if (data.description) {
    toUpdate.description = data.description;
  }

  let user = await User.findOneAndUpdate({ email: data.email }, toUpdate, {
    new: true,
  }).lean();
  user.message = "Profile updated successfully";

  return user;
};

export const fetchDonations = async (email) => {
  await connectDB();

  const payment = await Payment.find({ senderEmail: email })
    .sort({
      createdAt: -1,
    })
    .lean();

  let data = [];

  for (let i = 0; i < payment.length; i++) {
    data.push(payment[i]);

    let user = await User.findOne({ email: payment[i].receiver }).lean();

    if (user?.avatar !== "") {
      data[i]["image"] = user.avatar;
    } else {
      data[i]["image"] = "";
    }
    data[i]["username"] = user.username;
    delete data[i]["senderEmail"];
    delete data[i]["receiver"];
  }

  return data;
};
