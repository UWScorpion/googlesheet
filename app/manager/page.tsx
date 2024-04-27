"use client";

import React from "react";
import { useEffect, useState } from "react";
import { ManagerColumn } from "../common/constants";
import User from "../user/page";

const Manager = () => {
  const [columns, setColumns] = useState([] as ManagerColumn[]);
  const [rowNum, setRowNum] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      const req = new Request(`/api/googlesheet?range=Sheet1!A1:D8`);
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
          for (let i = 0; i < res.data.values.length; i++) {
            for (let j = 0; j < cols.length; j++) {
              if (cols[j].texts === undefined) {
                cols[j].texts = [res.data.values[i][j]];
              } else {
                cols[j].texts.push(res.data.values[i][j]);
              }
            }
          }
          setColumns(cols);
          return res.data.values;
        });
    };
    fetchData();
  }, []);

  const handleClick =(row: number, col: number)=>{
    if (row !== 0){
      return;
    }
    setRowNum(2 + col - 1);
  }

  const getColumns = () => {
    const hideColumns = ["Use Case"];
    return columns.filter(
      (col: ManagerColumn) => !hideColumns.includes(col.title || "")
    );
  };
  return (
    <div>
      <div className="font-bold ml-4 text-xl">MANAGER VIEW</div>
      <table className="border-separate border-spacing-4 border mt-4 ml-4">
        <tbody>
          {getColumns().map((row: ManagerColumn, i) => (
            <tr key={i} className={`${i === 0  ? "cursor-pointer" : ""}`}>
              {row.texts?.map((col: string, j) => (
                <td key={j} className={`${j === 0 ? "font-semibold cursor-auto" : ""}`} onClick={()=>handleClick(i, j)}>
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-20 font-bold ml-4 text-xl">USER VIEW</div>
      <div className="border">
        <User rowNumber = {rowNum}/>
      </div>
    </div>
  );
};

export default Manager;
