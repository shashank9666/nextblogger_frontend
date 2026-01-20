import Link from "next/link";

export default function Home() {
  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      <div className="flex justify-center items-center flex-col space-y-2">
        <h1 className="text-4xl font-bold">Nextblogger</h1>
        <button className="bg-black text-white hover:bg-white hover:text-black border duration-200 font-semibold  p-2 rounded-md">
          <Link href="/blogs">Explore Blogs</Link>
        </button>
      </div>
    </div>
  );
}