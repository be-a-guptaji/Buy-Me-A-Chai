import React from 'react'

const Footer = () => {
  const date=new Date().getFullYear()
  return (
    <footer className="bg-gray-950 flex justify-center items-center px-6 h-16 cursor-default w-screen">
      <p className="font-medium md:text-lg text-sm">
        <span className="md:font-bold">Copyright &copy; {date}</span> Get Me a Chai - All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer
