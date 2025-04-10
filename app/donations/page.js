"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchDonations, fetchUser } from "@/actions/userAction";

const page = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({});
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getData(session.user.email);
    }
  }, [session, router]);

  const getData = async (email) => {
    const currentUser = await fetchUser(email);
    setCurrentUser(currentUser);
    const payment = await fetchDonations(email);
    setDonations(payment);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} at ${hours}:${minutes}`;
  };

  return (
    <>
      <header className="my-8">
        <h1 className="text-5xl font-bold tracking-wider text-center">
          Doantions
        </h1>
        <div className="user flex md:flex-row flex-col w-full justify-around items-center my-6">
          <div className="userinfo md:w-1/3 flex flex-col gap-4">
            <div className="name flex gap-4 w-full justify-between">
              <p className="name md:text-2xl text-lg font-bold tracking-wider">
                Name :{" "}
              </p>
              <p className="name md:text-2xl text-lg font-bold tracking-wider">
                {currentUser.name}
              </p>
            </div>
            <div className="username flex gap-4 w-full justify-between">
              <p className="username md:text-2xl text-lg font-bold tracking-wider">
                User Name :{" "}
              </p>
              <p className="username md:text-2xl text-lg font-bold tracking-wider">
                {currentUser.username}
              </p>
            </div>
            <div className="email flex gap-4 w-full justify-between">
              <p className="email md:text-2xl text-lg font-bold tracking-wider">
                Email :{" "}
              </p>
              <p className="email md:text-2xl text-lg font-bold tracking-wider">
                {currentUser.email}
              </p>
            </div>
          </div>
          <div className="avatar lg:mt-0 mt-6">
            <Image
              width={200}
              height={200}
              src={currentUser.avatar}
              alt="avatar"
              className="aspect-square rounded-full border-2 border-white w-36"
            />
          </div>
        </div>
      </header>
      <main className="my-8">
        <h1 className="text-2xl font-bold tracking-wider text-center">
          You have made Donations for :{" "}
        </h1>
        {donations.length === 0 ? (
          <h1 className="text-2xl font-bold tracking-wider text-center my-4">
            No Donations Has Been Made
          </h1>
        ) : (
          <ul className="md:w3/4 w-4/5 my-4 mx-auto flex flex-col gap-4 min-h-72">
            {donations.map((donation) => (
              <li
                className={`w-full list-none min-h-24 rounded-lg p-4 border-2 border-white/45 backdrop-blur-3xl flex justify-between items-center ${
                  donation.done ? "bg-[#5bee3a]/30" : "bg-[#e22b2b]/30"
                }`}
                key={donation._id}
              >
                <div className="info flex flex-col gap-2">
                  <p className="text-lg font-medium">
                    Donated{" "}
                    <span className="text-[#FFB200]">{donation.amount} ₹</span>{" "}
                    to{" "}
                    <span className="text-[#de3535]">{donation.username}</span>{" "}
                    on{" "}
                    <span className="text-[#c7349d]">
                      {" "}
                      {formatDate(donation.createdAt)}
                    </span>{" "}
                    {donation.message ? "with the message : " : "."}
                  </p>
                  <p className="text-lg font-medium text-[#00aeff]">
                    {donation.message ? donation.message : ""}
                  </p>
                </div>

                <div>
                  <Image
                    width={200}
                    height={200}
                    src={donation.image}
                    alt="avatar"
                    className="aspect-square rounded-full border-2 border-white w-14"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default page;
