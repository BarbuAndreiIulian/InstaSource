import React from "react";
import home from "../assets/home.png";
import message from "../assets/message.png";
import upload from "../assets/upload.png";
import discover from "../assets/discover.png";
import hearth from "../assets/hearth.png";
import search from "../assets/search.png";
import arrowdown from "../assets/arrowdown.png";
import instagram from "../assets/instagram.png";
import profile from "../assets/profile.jpg";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalState";
import { signIn, signOut, useSession } from "next-auth/react";
import nouser from "../assets/nouser.jpg";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
  const [modal, setModal] = useRecoilState(modalState);
  const { data: session } = useSession();

  console.log(modal);
  return (
    <div className="shadow-sm border-b fixed -top-[1px] z-50  bg-white w-full">
      <div className="flex justify-between items-center mp-2  max-w-[61rem] mx-auto px-2 sm:pl-4 sm:pr-8 w-full h-[59px] ">
        {/* Left */}
        <div className="flex flex-[1_0_127px] items-center mr-2 shrink-0 ">
          <div
            className="flex items-center shrink-0 "
            onClick={() => router.push("/")}
          >
            <Image src={instagram} alt="" height={38} width={110} />
          </div>
          <div className="-mt-2 pl-1 shrink-0">
            <Image src={arrowdown} alt="" width={12} height={12} />
          </div>
        </div>

        {/* Middle */}
        <div className="hidden sm:flex relative w-[17rem] items-center h-full">
          <div className="absolute inset-y-0 flex items-center  pl-4 pointer-events-none ">
            <Image src={search} height={16} width={16} alt="" className="" />
          </div>

          <input
            type="text"
            placeholder="Search"
            className=" bg-[#efefef] h-9 pl-11 w-full rounded-md border-none font-thin focus:ring-0 outline-0 "
          />
        </div>
        {/* Right */}
        <div className="flex items-center justify-end flex-[1_0_127px]  space-x-[1.36rem] sm:pl-24">
          <div className="Btn hidden sm:flex" onClick={() => router.push("/")}>
            <Image src={home} alt="" />
          </div>
          <div className="Btn hidden sm:flex relative">
            <Image src={message} alt="" />
            <div
              className="absolute -top-1.5 -right-2 text-xs w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center
              text-white"
            >
              1
            </div>
          </div>
          <div
            className="Btn sm:flex"
            onClick={session ? () => setModal(!modal) : signIn}
          >
            <Image src={upload} alt="" />
          </div>
          <div className="Btn hidden sm:flex">
            <Image src={discover} alt="" />
          </div>
          <div className="Btn hidden sm:flex">
            <Image src={hearth} alt="" />
          </div>
          <div className="shrink-0">
            {session ? (
              <div className="flex ">
                <img
                  src={session.user.image}
                  alt=""
                  className="rounded-full h-6 cursor-pointer"
                  onClick={signOut}
                />
                <p
                  onClick={signOut}
                  className="cursor-pointer text-[#0095f6]     
              font-semibold ml-4"
                >
                  Sign out
                </p>
              </div>
            ) : (
              <div className="flex">
                <img
                  src={nouser.src}
                  alt=""
                  className="rounded-full h-6 cursor-pointer"
                  onClick={signIn}
                />
                <p
                  onClick={signIn}
                  className="cursor-pointer text-[#0095f6]     
              font-semibold ml-5"
                >
                  Sign in
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
