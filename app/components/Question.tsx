"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Column, scoreList } from "../common/constants";
import CommentModal from "./CommentModal";
import Dropdown from "./Dropdown";
interface QuestionProps {
  column: Column;
  rowNumber: number;
}

const Question = ({ column, rowNumber }: QuestionProps) => {
  const [value, setValue] = useState(column.text);
  useEffect(() => {
    setValue(column.text);
  }, [column.text]);

  const handleTextChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (!column.columnNum) {
      return;
    }
    const req = new Request(
      `/api/googlesheet?range=${column.columnNum}${rowNumber}`
    );
    const response = await fetch(req, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.target.value),
    });

    return response;
  };

  return (
    <div>
      <label
        htmlFor={column.title}
        className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
      >
        {column.title}
      </label>
      <div className="flex flex-row">
        <div>
          <textarea
            value={value}
            onChange={(e) => handleTextChange(e)}
            className="appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name={column.title}
            id={column.id}
            disabled={column.disabled}
          />
          <div className="flex flex-row"><span className="text-gray-500 mr-4">Rating:</span> <Dropdown title={"Select A Writer"} options={scoreList} /></div>
        </div>
        <div className="ml-4">
          <CommentModal column={column} rowNumber={rowNumber} />
        </div>
      </div>
    </div>
  );
};

export default Question;
