"use client";
import React, {  useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Tea from "@/components/Tea";
import Man from "@/components/Man";
import { Coin } from "@/components/Coin";
import Group from "@/components/Group";
import Help from "@/components/Help";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search) {
      router.push(`/${search}`);
    }
    setSearch("");
  };

  return (
    <>
      <div className="container flex items-center justify-center flex-col min-h-96 gap-8 w-full m-auto">
        <div className="mx-auto heading flex justify-center items-center font-bold md:text-6xl text-4xl gap-6">
          <h1 className="main-heading cursor-default"> Buy Me a Chai </h1>
          <Tea fill="white" size={70} stroke="#898dd2" />
        </div>
        <p className="description cursor-default font-medium text-lg text-center md:w-full w-11/12 tracking-widest">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start Now!
        </p>
        <div className="btn flex gap-4">
          <Link href="/login">
            <Button text="Start Here!" />
          </Link>
          <Link href="/about">
            <Button text="Read More" />
          </Link>
        </div>
      </div>

      <div className="search bg-black flex mb-16 items-center rounded-full text-[#71767b] focus-within:border focus-within:bg-black focus-within:border-[#1D9BF0] focus-within:fill-[#1D9BF0] fill-[#71767b]/80 z-10 lg:w-7/12 mx-auto w-3/4 border border-white/45">
        <div className="search-icon p-2 ml-2 bg-black rounded-full">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-6"
            fill="lightblue"
          >
            <g>
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
            </g>
          </svg>
        </div>

        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search"
          className="w-full rounded-r-full bg-black text-white font-semibold tracking-widest focus:outline-none focus:bg-black focus:border-[#1D9BF0] focus:fill-[#1D9BF0] fill-[#71767b]/80 p-2"
        />
        <button
          onClick={() => {
            handleSearch();
          }}
          id="searchBox"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            version="1.1"
            className="w-6 h-6 cursor-pointer mr-4 ml-2"
            fill="white"
          >
            <g
              id="🔍-System-Icons"
              stroke="none"
              strokeWidth="1"
              fill="white"
              fillRule="evenodd"
            >
              <g
                id="ic_fluent_arrow_enter_24_filled"
                fill="white"
                fillRule="nonzero"
              >
                <path
                  d="M21,4 C21.5128358,4 21.9355072,4.38604019 21.9932723,4.88337887 L22,5 L22,11.5 C22,13.3685634 20.5357224,14.8951264 18.6920352,14.9948211 L18.5,15 L5.415,15 L8.70710678,18.2928932 C9.06759074,18.6533772 9.09532028,19.2206082 8.79029539,19.6128994 L8.70710678,19.7071068 C8.34662282,20.0675907 7.77939176,20.0953203 7.38710056,19.7902954 L7.29289322,19.7071068 L2.29289322,14.7071068 C2.25749917,14.6717127 2.22531295,14.6343256 2.19633458,14.5953066 L2.12467117,14.4840621 L2.12467117,14.4840621 L2.07122549,14.371336 L2.07122549,14.371336 L2.03584514,14.265993 L2.03584514,14.265993 L2.0110178,14.1484669 L2.0110178,14.1484669 L2.00397748,14.0898018 L2.00397748,14.0898018 L2,14 L2.00278786,13.9247615 L2.00278786,13.9247615 L2.02024007,13.7992742 L2.02024007,13.7992742 L2.04973809,13.6878575 L2.04973809,13.6878575 L2.09367336,13.5767785 L2.09367336,13.5767785 L2.14599545,13.4792912 L2.14599545,13.4792912 L2.20970461,13.3871006 L2.20970461,13.3871006 L2.29289322,13.2928932 L2.29289322,13.2928932 L7.29289322,8.29289322 C7.68341751,7.90236893 8.31658249,7.90236893 8.70710678,8.29289322 C9.06759074,8.65337718 9.09532028,9.22060824 8.79029539,9.61289944 L8.70710678,9.70710678 L5.415,13 L18.5,13 C19.2796961,13 19.9204487,12.4051119 19.9931334,11.64446 L20,11.5 L20,5 C20,4.44771525 20.4477153,4 21,4 Z"
                  id="🎨-Color"
                ></path>
              </g>
            </g>
          </svg>
        </button>
      </div>

      <hr className="opacity-25" />

      <h2 className="sub-heading font-bold md:text-3xl text-2xl text-center my-16 md:w-full w-11/12">
        Your Fans can buy you a Chai
      </h2>
      <div className="flex justify-around items-center my-16 md:flex-row flex-col gap-10 ">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="items bg-slate-500 rounded-full p-2">
            <Man size={60} />
          </div>
          <p className="details font-bold text-lg tracking-wide">
            Work Without Worry
          </p>
          <p className="text-center tracking-wide opacity-75">
            Your Fans are available for you to help
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="items bg-slate-500 rounded-full p-2">
            <Coin size={60} />
          </div>
          <p className="details font-bold text-lg tracking-wide">
            Fund Yourself
          </p>
          <p className="text-center tracking-wide opacity-75">
            Your Fans are available for you to help
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="items bg-slate-500 rounded-full p-2">
            <Group size={60} />
          </div>
          <p className="details font-bold text-lg tracking-wide">
            Your Fans want to help
          </p>
          <p className="text-center tracking-wide opacity-75">
            Your Fans are available for you to help
          </p>
        </div>
      </div>

      <hr className="opacity-25" />
      <h2 className="sub-heading font-bold md:text-3xl text-2xl text-center my-16  md:w-full w-11/12 tracking-widest">
        Learn More About us
      </h2>
      <div className="flex justify-center items-center my-16 md:flex-row flex-col gap-8">
        <div className=" md:w-2/5 w-11/12 flex">
          <Help height={315} width={560} />
        </div>
        <p className="text-center md:w-2/5 tracking-wide font-medium md:text-lg w-4/5">
          To ensure that your favorite creators and developers can continue
          producing the content you love, consider supporting them directly.
          This can be done through platforms like Patreon or Ko-fi, or by
          purchasing their merchandise. Additionally, you can help by engaging
          with their content on social media, subscribing to their channels, and
          leaving positive reviews. By taking these actions, you are not only
          showing your appreciation but also contributing to their ability to
          create more amazing work.
        </p>
      </div>
    </>
  );
}
