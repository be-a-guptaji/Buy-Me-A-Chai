"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Script from "next/script";
import { initiate, fetchUser, fetchPayment } from "@/actions/userAction";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const SearchParams = useSearchParams();
  const router = useRouter();
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getData();
    if (SearchParams.get("paymentDone") == "true") {
      toast("Donation Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.replace(`${username}`);
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await pay(data);
  };

  const getData = async () => {
    let user = await fetchUser(username);
    setcurrentUser(user);

    let dbPayment = await fetchPayment(user.email);
    setPayments(dbPayment);
  };

  async function pay(data) {
    try {
      data.SenderEmail = session.user.email;
      data.userEmail = currentUser.email;

      let order = await initiate(
        data,
        currentUser.razorpayID,
        currentUser.razorpaySecret
      ); // Make sure initiate() is defined and returns a valid order object

      let options = {
        key: currentUser.razorpayID, // Replace with your actual Key ID
        amount: data.amount, // Amount is in currency subunits (e.g., 50000 paise = 500 INR)
        currency: "INR",
        name: "Buy Me a Chai", // Your business name
        description: "Thanks for your support",
        image: "https://example.com/your_logo",
        order_id: order, // Pass the id obtained from the initiate API
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`, // Ensure this URL is correct and accessible
        prefill: {
          name: session.user.name, // Your customer's name
          email: session.user.email,
          contact: "9000090000", // Customer's phone number
        },
        notes: {
          address: "Agra, Uttar Pradesh, India",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Create a new instance of Razorpay
      let rzp1 = new window.Razorpay(options);

      // Open the Razorpay payment modal
      await rzp1.open();
    } catch (error) {
      console.error("Error in payment processing:", error);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="cover relative md:mb-24 mb-16">
        <Image
          width={1000}
          height={1000}
          src={currentUser.cover}
          alt="cover"
          className="object-cover w-full max-h-96 md:h-full md:aspect-video aspect-video"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 md:translate-y-20 translate-y-12 aspect-square md:h-36 md:w-36 h-20 w-20">
          <Image
            width={1000}
            height={1000}
            src={currentUser.avatar}
            alt="avatar"
            className="aspect-square  rounded-xl border-2 border-white"
          />
        </div>
      </div>
      <div className="info flex flex-col justify-center items-center gap-3">
        <div className="username font-bold tracking-wide text-3xl">
          <h1>{currentUser.name}</h1>
        </div>
        <div className="name">
          <p className="opacity-70">
            Let&apos;s to get {currentUser.name} a Chai
          </p>
        </div>
        <div className="description my-12">
          <p className="text-center text-xl font-semibold tracking-wider">
            {currentUser.description}
          </p>
        </div>
        <div className="stats">
          <p className="donations mx-auto w-10/12 text-center">
            <span className="font-bold text-[#FFB200]">
              {payments.length} Donations
            </span>
            <span className="font-bold"> . </span>
            <span className="font-bold">
              {currentUser.name} has raised{" "}
              <span className="text-[#FFB200]">
                {" "}
                ₹
                {payments.reduce((total, payment) => total + payment.amount, 0)}
              </span>{" "}
              from this project
            </span>
          </p>
        </div>
      </div>

      <div className="payment md:flex w-11/12 justify-center items-center mx-auto my-16 gap-4">
        <div className="makePayment md:w-1/2 rounded-xl bg-slate-800 p-4 h-[75vh] border border-white/50 my-4">
          <h2 className="font-bold text-2xl text-center mb-4 text-[#FFB200]">
            Donate to Aryan
          </h2>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center items-center gap-2 mb-8"
          >
            <input
              type="text"
              className="w-full h-10 border border-white/50 px-4 py-2 rounded-xl bg-slate-500 text-lg"
              placeholder="Enter Name"
              {...register("name", {
                required: { value: true, message: "Name is required" },
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: "Name should only contain alphabets",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
            <input
              type="text"
              className="w-full h-10 border border-white/50 px-4 py-2 rounded-xl bg-slate-500 text-lg"
              placeholder="Enter Message"
              {...register("message", {
                maxLength: {
                  value: 100,
                  message: "Message should be less than 100 characters",
                },
              })}
            />
            {errors.message && (
              <span className="text-red-600">{errors.message.message}</span>
            )}
            <input
              type="text"
              className="w-full h-10 border border-white/50 px-4 py-2 rounded-xl bg-slate-500 text-lg"
              placeholder="Enter Amount"
              {...register("amount", {
                required: { value: true, message: "Amount is required" },
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Amount should only contain numbers",
                },
              })}
            />
            {errors.amount && (
              <span className="text-red-600">{errors.amount.message}</span>
            )}
            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Donating..." : "Donate"}
              className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 w-full ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            />
          </form>
          <div className="choosePayment my-4 mx-2 grid grid-cols-3 gap-2">
            <Button action={() => setValue("amount", "5")} text={"₹5"} />
            <Button action={() => setValue("amount", "10")} text={"₹10"} />
            <Button action={() => setValue("amount", "50")} text={"₹50"} />
            <Button action={() => setValue("amount", "100")} text={"₹100"} />
            <Button action={() => setValue("amount", "500")} text={"₹500"} />
            <Button action={() => setValue("amount", "1000")} text={"₹1000"} />
          </div>
        </div>

        <div className="suppoters md:w-1/2 rounded-xl bg-slate-800 p-8 h-[75vh] border border-white/50 my-4">
          <h2 className="font-bold text-2xl text-center mb-4 text-[#FFB200]">
            Top 10 Supporters
          </h2>
          <ul className="my-4 overflow-x-hidden overflow-y-scroll h-[60vh]">
            {payments.length === 0 && (
              <p className="text-center text-2xl font-semibold">
                No Supporters yet
              </p>
            )}

            {payments.map((payment, index) => {
              // Use a unique identifier if available, e.g., payment.id
              const uniqueKey = payment.id || payment.sender + payment.amount; // Or a combination of properties

              if (index > 9) {
                return;
              }
              return (
                <li
                  className="m-6 bg-slate-500 min-h-16 border border-white/50 px-4 py-2 rounded-xl flex gap-4 justify-start items-center"
                  key={uniqueKey} // Use the unique key here
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={payment.image === "" ? "avatar.png" : payment.image}
                    alt="image"
                    className="rounded-full aspect-square w-12 h-12"
                  />
                  <p className="message">
                    <span className="font-bold text-[#FFB200]">
                      {payment.sender}{" "}
                    </span>
                    Donated
                    <span className="font-bold text-[#FFB200]">
                      {" "}
                      ₹{payment.amount}{" "}
                    </span>
                    {payment.message && (
                      <span>
                        with the message{" "}
                        <span className="font-semibold text-lg text-[#231e8f]">
                          {payment.message}
                        </span>
                      </span>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
