import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import profile from "../assets/profile.jpg";
import nouser from "../assets/nouser.jpg";

const MiniProfile = () => {
  const { data: session } = useSession();
  return (
    <div className=" w-full">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="h-14 w-14  mr-4">
            {session ? (
              <img src={session.user.image} alt="" className="rounded-full" />
            ) : (
              <img src={nouser.src} alt="" className="rounded-full" />
            )}
          </div>

          <p className="text-sm font-semibold">
            {session ? session.user.name : "Please Log In"}
          </p>
        </div>

        <button className="text-xs font-semibold text-[#0095f6]">
          {session ? (
            <div onClick={signOut}> Sign out</div>
          ) : (
            <div onClick={signIn}> Sign in</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default MiniProfile;
