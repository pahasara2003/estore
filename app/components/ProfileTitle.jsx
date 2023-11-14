import React from "react";

const ProfileTItle = ({ name }) => {
  return (
    <>
      <hr className="mx-5" />

      <h1 className="text-[1.4rem]  md:text-[2rem]  rounded-md mx-2 text-center  md:text-left md:px-[10vw]  py-7  tracking-widest px-10  font-bold ">
        Hola! &nbsp;
        <span
          style={{ WebkitBackgroundClip: "text" }}
          className=" text-[1.6rem] md:text-[4rem] text-transparent tracking-normal bg-gradient-to-r from-red-400 to-orange-300"
        >
          {name}
        </span>
      </h1>
      <hr className="mx-5" />
    </>
  );
};

export default ProfileTItle;
