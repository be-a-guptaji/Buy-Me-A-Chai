import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDB from "@/db/connectDB";
import User from "@/models/User.model";

const page = async ({ params }) => {
  await connectDB();
  const user = await User.findOne({ username: params.username }).lean();
  if (!user) {
    return notFound();
  }
  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default page;

export async function generateMetadata ({ params }) {
  return {
    title: `Support ${params.username} - Get Me a Chai`,
  }
};
