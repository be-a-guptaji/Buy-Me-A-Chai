import Link from "next/link";
import Button from "@/components/Button";
export default function NotFound() {
  return (
    <main>
      <div className="container flex flex-col items-center justify-center md:min-h-[83.5vh] min-h-[83.5vh] w-full m-auto p-6">
        <h1 className="text-4xl my-8 text-center font-bold">
          The User Name You searched for was not found
        </h1>
        <p className="text-center text-lg">Oops! This page was not found</p>
        <Link href="/" className="my-8">
          <Button text="Return Home" />
        </Link>
      </div>
    </main>
  );
}
