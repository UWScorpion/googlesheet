"use client";

import { useEffect, useState } from "react";
import { Column } from "../common/constants";
import Question from "../components/Question";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
const User = () => {
  const [columns, setColumns] = useState([] as Column[]);
  const [promptId, setPromptId] = useState("");
  const [rowNum, setRowNum] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      const req = new Request(`/api/googlesheet?range=A1:J2`);
      await fetch(req, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const cols = res.data.values[0].map((title: string) => ({ title }));
          for (let i = 0; i < res.data.values[1].length; i++) {
            cols[i].text = res.data.values[1][i];
          }
          setPromptId(cols[0].text);
          setColumns(cols.slice(1));
          return res.data.values;
        });
    };
    fetchData();
  }, []);

  const handleNav = async (nextPage: number, jumpTo?: number) => {
    let row = rowNum + nextPage;
    if (jumpTo){
      row = jumpTo;
    }
    if (row < 2 ) {
      return;
    }
    setRowNum(row);
    const range = `A${row}:J${row}`;
    const req = new Request(`/api/googlesheet?range=${range}`);
    const response = await fetch(req, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data.values){
          setPromptId(res.data.values[0][0]);
          const cols:Column[] = [...columns];
          for(let i = 1; i < res.data.values[0].length; i++){
            cols[i-1].text = res.data.values[0][i];
          }
          setColumns(cols);
        }

        return res.data.values;
      });
    return response;
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <div className="ml-4">Prompt ID: {promptId}</div>
        <label className="ml-4">Row</label>
        <SlArrowLeft onClick={() => handleNav(-1)} />
        <input
          type="text"
          value={rowNum}
          className="w-10 ml-4 mr-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          onChange={(e) => handleNav(0, Number(e.target.value))}
        />
        <SlArrowRight onClick={() => handleNav(1)} />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {columns.map((c: Column, idx) => (
          <div key={idx} className="ml-4">
            <Question column={c} />
          </div>
        ))}
      </div>
    </>
  );
};

export default User;
