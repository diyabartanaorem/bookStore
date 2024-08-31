import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 hover:bg-white hover:text-black border border-sky-500 text-white px-4 py-1 rounded-lg w-fit "
      >
        {/* <BsArrowLeft className="text-2xl" /> */}
        <IoIosArrowBack className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
