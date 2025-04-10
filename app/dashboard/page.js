"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { updateProfile, fetchUser } from "@/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getData();
      document.title = "Dashboard - Get Me a Chai";
    }
  }, [session, router]);

  const getData = async () => {
    const user = await fetchUser(session.user.email);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("avatar", user.avatar);
    setValue("cover", user.cover);
    setValue("description", user.description);
    setValue("username", user.username);
    setValue("razorpayID", user.razorpayID);
    setValue("razorpaySecret", user.razorpaySecret);
  };

  const onSubmit = async (data) => {
    update();
    data.email = session.user.email;
    let response = await updateProfile(data);
    toast(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
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
      <div className="dashboard mt-12 md:mt-2 md:mb-[0.685rem] mb-4  md:w-1/2 mx-auto flex justify-center items-center flex-col gap-2">
        <h2 className="text-3xl font-bold text-center my-2">
          Welcome to your dashboard
        </h2>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-center mt-12 md:mt-2 md:mb-12 mb-[0.6rem]"
        >
          <div className="w-9/12">
            <label htmlFor="name">
              <p className="font-bold m-1">Name</p>
            </label>
            <input
              type="text"
              className="w-full h-8 border border-white/50 px-4 rounded-xl bg-slate-500"
              placeholder="Enter Name"
              id="name"
              {...register("name")}
            />
          </div>
          <div className="w-9/12">
            <label htmlFor="Email">
              <p className="font-bold m-1">Email</p>
            </label>
            <input
              type="email"
              className="w-full h-8 border border-white/50 px-4 rounded-xl bg-slate-500"
              placeholder="Enter Email"
              id="Email"
              readOnly
              {...register("email")}
            />
          </div>
          <div className="w-9/12">
            <label htmlFor="UserName">
              <p className="font-bold m-1">User Name</p>
            </label>
            <input
              type="text"
              className="w-full h-8 border border-white/50 px-4 rounded-xl bg-slate-500"
              placeholder="Enter User Name"
              id="UserName"
              {...register("username")}
            />
          </div>
          <div className="w-9/12">
            <label htmlFor="avatar">
              <p className="font-bold m-1">Avatar Link</p>
            </label>
            <input
              type="text"
              className="w-full h-8 border border-white/50 px-4 rounded-xl bg-slate-500"
              placeholder="Enter avatar Link"
              id="avatar"
              {...register("avatar")}
            />
          </div>
          <div className="w-9/12">
            <label htmlFor="Cover">
              <p className="font-bold m-1">Cover Link</p>
            </label>
            <input
              type="text"
              className="w-full h-8 border border-white/50 px-4 rounded-xl bg-slate-500"
              placeholder="Enter Cover Link"
              id="Cover"
              {...register("cover")}
            />
          </div>
          <div className="w-9/12">
            <label htmlFor="Description">
              <p className="font-bold m-1">Description</p>
            </label>
            <input
              type="text"
              className="w-full h-8 border border-white/50 px-4 rounded-xl bg-slate-500"
              placeholder="Enter Description"
              id="Description"
              {...register("description")}
            />
          </div>
          <div className="w-9/12">
            <label htmlFor="RazorPayID">
              <p className="font-bold m-1">Razor Pay Id</p>
            </label>
            <input
              type="password"
              className="w-full h-8 border border-white/50 px-4 rounded-xl bg-slate-500"
              placeholder="Enter Razor Pay Id"
              id="RazorPayID"
              {...register("razorpayID")}
            />
          </div>
          <div className="w-9/12">
            <label htmlFor="RazorPaySecret">
              <p className="font-bold m-1">Razor Pay Secret</p>
            </label>
            <input
              type="password"
              className="w-full h-8 border border-white/50 px-4 rounded-xl bg-slate-500"
              placeholder="Enter Razor Pay Secret"
              id="RazorPaySecret"
              {...register("razorpaySecret")}
            />
          </div>
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting..." : "Save"}
            className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 w-9/12 md:mt-6 mt-8 ${
              isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          />
        </form>
      </div>
    </>
  );
};

export default Page;
