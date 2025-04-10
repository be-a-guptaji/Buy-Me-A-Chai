import React from "react";

const page = () => {
  return (
    <>
      <header className="my-12 flex flex-col gap-6">
        <h1 className="text-5xl font-bold tracking-wider text-center">About</h1>
        <h2 className="text-2xl font-bold tracking-wider text-center">
          Hi there! I am <span className="text-[#FFC107]">Aryan Baadlas</span>{" "}
          the creator of this platform{" "}
        </h2>
      </header>
      <main className="container flex flex-col items-center justify-center md:min-h-[57.5vh] min-h-[83.5vh] w-full m-auto gap-4 p-6">
        <p className="text-center text-lg font-medium tracking-wide">
          I am a student at{" "}
          <span className="text-[#FFC107]">
            Raja Balwant Singh Engineering Technical Campus, Bichpuri Agra Uttar
            Pradesh
          </span>{" "}
          pursuing a degree in{" "}
          <span className="text-[#FFC107]">
            Computer Science and Engineering
          </span>
          .
        </p>
        <p className="text-center text-lg font-medium tracking-wide">
          I am passionate about{" "}
          <span className="text-[#FFC107]">web development</span> and{" "}
          <span className="text-[#FFC107]">
            artificial intelligence and machine learning
          </span>
          .
        </p>
        <p className="text-center text-lg font-medium tracking-wide">
          &quot;Buy Me a Chai&quot; is a platform similar to Patreon, designed
          to help creators monetize their work through direct support from their
          audience. It allows fans to contribute small, recurring payments in
          exchange for exclusive content, behind-the-scenes access, or other
          perks. The name &quot;Buy Me a Chai&quot; evokes a sense of casual,
          friendly support—like offering to buy someone a cup of chai in
          exchange for their creativity. It&apos;s an easy way for creators to
          build a sustainable income while fostering a closer connection with
          their community, all while keeping the process simple and accessible.
        </p>
      </main>
    </>
  );
};

export default page;

export const metadata = {
  title: "About - Get Me a Chai",
};
