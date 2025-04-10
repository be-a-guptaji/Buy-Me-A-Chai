"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Tea from "./Tea";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handelDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className="bg-gray-950 flex justify-between md:px-12 h-16 px-4 items-center cursor-default">
      <Link href={"/"} className="cursor-default">
        <div className="logo font-bold md:text-2xl flex justify-center items-center md:gap-4 gap-2 text-lg">
          <Tea fill="white" size={42} stroke="#898dd2" />
          <p> Buy Me a Chai!</p>
        </div>
      </Link>
      <div className="menu md:flex justify-center items-center">
        {session && Dropdown(session, showDropdown, handelDropdown, router)}
        {!session && (
          <Link href={"/login"}>
            <Button text="Login" />
          </Link>
        )}
      </div>
    </nav>
  );
};

const Dropdown = (session, showDropdown, handelDropdown, router) => {
  return (
    <>
      <div className="relative" id="dropdown">
        <button
          id="dropdownDelayButton"
          data-dropdown-toggle="dropdownDelay"
          data-dropdown-delay="500"
          data-dropdown-trigger="hover"
          className="bg-blue-700 hover:bg-blue-800 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="button"
          onMouseOver={() => setTimeout(handelDropdown, 250)}
          onBlur={() => setTimeout(handelDropdown, 500)}
        >
          Options
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdownDelay"
          className={`z-10 absolute top-14 bg-white divide-y ${
            showDropdown ? "" : "hidden"
          } divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-full
`}
          onMouseLeave={() => setTimeout(handelDropdown, 500)}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDelayButton"
          >
            <li>
              <Link
                href="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-medium text-center"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-medium text-center"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={session.user.name}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-medium text-center"
              >
                Your Page
              </Link>
            </li>
            <li>
              <Link
                href="/donations"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-medium text-center"
              >
                Donations
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-medium text-center"
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
