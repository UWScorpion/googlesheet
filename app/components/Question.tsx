"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Column } from "../common/constants";
interface Props {
  column: Column;
  rowNumber: number;
}

const Question = ({ column , rowNumber}: Props) => {
  const [value, setValue] = useState(column.text);
  useEffect(()=>{
    setValue(column.text);
  }, [column.text]);

  const handleTextChange = async (e: ChangeEvent<HTMLTextAreaElement>)=>{
    console.log(column.columnNum! + rowNumber);
    setValue(e.target.value);
    if (!column.columnNum){
      return;
    }
    const req = new Request(`/api/googlesheet?range=${column.columnNum! + rowNumber}`);
    const response = await fetch(req, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.target.value),
    });

    return response;
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
        value={value}
        onChange={(e)=>handleTextChange(e)}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        name={column.title}
        id={column.id}
      />
      </div>
    </div>
  );
};

export default Question;
