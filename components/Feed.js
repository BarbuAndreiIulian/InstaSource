import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed = () => {
  return (
    <div className="flex  max-w-[790px] lg:max-w-[854px] mx-auto pt-4  sm:pt-[22px]  mt-12">
      <section className="w-[100vw] max-w-[470px]  mx-auto  lg:ml-8 lg:mr-8">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>
      <section className=" w-[320px] h-[420px] hidden lg:block mt-[30px] mr-auto ">
        {/* MiniProfile */}
        <MiniProfile />
        {/* Suggestions */}
        <Suggestions />
      </section>
    </div>
  );
};

export default Feed;
