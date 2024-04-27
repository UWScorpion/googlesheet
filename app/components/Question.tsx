"use client";
import React from "react";
import { Column } from "../common/constants";
import { useState } from "react";
interface Props {
  column: Column;
}

const Question = ({ column }: Props) => {
  const handleTextChange =()=>{
  }
  return (
    <div>
      <label
        htmlFor={column.title}
        className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
      >
        {column.title}
      </label>
      <div className="flex flex-row">
      <textarea
        value={column.text}
        onChange={handleTextChange}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        name={column.title}
        id={column.id}
      />
      </div>
    </div>
  );
};

export default Question;
