import React from "react";

const Story = ({ img, username }) => {
  return (
    <div>
      <div className="">
        <img
          src={img}
          alt=""
          className="rounded-full p-[1.5px] border-[3px] border-red-500 "
        />
        <p className="text-xs w-[60px] truncate text-center">{username}</p>
      </div>
    </div>
  );
};

export default Story;
