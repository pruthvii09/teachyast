import Razorpay from "razorpay";
import crypto from "crypto";
import prisma from "../prisma/prisma.js";
export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
      },
    });
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: course.price * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const verifyPayment = async (req, res) => {
  console.log("hello");
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      studentId,
      studentEmail,
      courseId,
    } = req.body;
    console.log("payment", req.body);
    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
    console.log("Transiction Verified");
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        studentEmail,
        courseId: courseId,
      },
    });
    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      enrollment: enrollment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
