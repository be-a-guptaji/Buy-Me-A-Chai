import React from 'react'

export const Coin = ({size=50}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="#ffbf00"
        className="injected-svg -translate-x-1 translate-y-1"
        data-src="https://cdn.hugeicons.com/icons/coins-pound-solid-standard.svg"
        role="img"
        color="#000000"
        title="Coin"
      >
        <title>Coin</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.75 1C8.91751 1 5 4.91751 5 9.75C5 14.5825 8.91751 18.5 13.75 18.5C18.5825 18.5 22.5 14.5825 22.5 9.75C22.5 4.91751 18.5825 1 13.75 1ZM14.75 6C13.5074 6 12.5 7.00736 12.5 8.25V9.5H12.25C11.8358 9.5 11.5 9.83579 11.5 10.25C11.5 10.6642 11.8358 11 12.25 11H12.5V11.25C12.5 11.6642 12.1642 12 11.75 12C11.3358 12 11 12.3358 11 12.75C11 13.1642 11.3358 13.5 11.75 13.5H16.25C16.6642 13.5 17 13.1642 17 12.75C17 12.3358 16.6642 12 16.25 12H13.872C13.9549 11.7654 14 11.513 14 11.25V11H14.75C15.1642 11 15.5 10.6642 15.5 10.25C15.5 9.83579 15.1642 9.5 14.75 9.5H14V8.25C14 7.83579 14.3358 7.5 14.75 7.5C15.1642 7.5 15.5 7.83579 15.5 8.25V8.75C15.5 9.16421 15.8358 9.5 16.25 9.5C16.6642 9.5 17 9.16421 17 8.75V8.25C17 7.00736 15.9926 6 14.75 6Z"
          fill="#ffbf00"
        ></path>
      </svg>
    </>
  );
}
