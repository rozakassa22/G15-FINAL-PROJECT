import React from "react";
import Image from "next/image";
import Link from "next/link";

const LoginBox: React.FC = () => {
  return (
    <div className="w-2/3 bg-white p-8 shadow-md flex flex-col -ml-16">
      <div className="mb-4 flex justify-center">
        <div>
          <Image
            src="/images/profile.png"
            alt=""
            width={80}
            height={80}
            className="rounded-full"
          />
          <h1 className="text-2xl font-semibold">LOGIN</h1>
        </div>
      </div>
      <div className="mb-4 w-full">
        <div className="mb-4">
          <h3 className="mb-1 font-bold">ID No</h3>
          <input
            type="text"
            className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="UGR/1234/**"
          />
        </div>
        <div>
          <h3 className="mb-1 font-bold">PASSWORD</h3>
          <input
            type="password"
            name=""
            id=""
            placeholder="********"
            className="w-full border-b border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <Link href={"/signup"}>
          <button className="w-full bg-primary text-white px-4 py-2">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginBox;