"use client"
import React from 'react'

const Button = ({ text ,action,css}) => {
  return (
    <button
      type="button"
      className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ${css}`}
      onClick={action}
      title={text}
    >
      {text}
    </button>
  );
}

export default Button
