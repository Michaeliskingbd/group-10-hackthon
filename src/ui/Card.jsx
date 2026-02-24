import { Sticker } from "lucide-react";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const Card = ({ img, name, sub, area, body, btn,status,sticker }) => {
  return (
    <div className=" bg-white rounded-2xl shadow-md overflow-hidden w-[320px] hover:shadow-lg transition ">

      {/* Image */}
      <div className="h-55 w-full overflow-hidden relative">
         <div className="bg-green-500 w-fit rounded-xl text-white px-3 py-1 text-xs absolute top-4 left-4">{status}</div>
         <div className=" bg-amber-500 w-fit rounded-xl text-black px-3 py-1 text-xs absolute top-4 right-4">{sticker}</div>
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
        />
       
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">

        {/* Name + Badge */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {name}
          </h3>

          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full capitalize">
            {sub}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm">
          <IoLocationOutline className="mr-1" />
          {area}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {body}
        </p>

        {/* Button */}
        <button className="w-full border border-gray-300 py-2 rounded-xl text-gray-700 font-medium hover:bg-black transition hover:text-white ">
          {btn}
        </button>

      </div>
    </div>
  );
};

export default Card;
