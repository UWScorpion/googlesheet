"use client";

import { useEffect, useState } from "react";
import { Column } from "../common/constants";
import Question from "../components/Question";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
interface Props {
  rowNumber: number;
}
const User = ({rowNumber}: Props) => {
  const [columns, setColumns] = useState([] as Column[]);
  const [rowNum, setRowNum] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      const req = new Request(`/api/googlesheet?range=Sheet1!A1:Z2`);
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
            cols[i].columnNum = String.fromCharCode('A'.charCodeAt(0) + i);
          }
          setColumns(cols);
          return res.data.values;
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const req = new Request(`/api/googlesheet?range=Sheet1!A${rowNumber}:Z${rowNumber}`);
      await fetch(req, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data.values && columns.length > 0){
            const cols:Column[] = [...columns];
            for(let i = 0; i < res.data.values[0].length; i++){
              cols[i].text = res.data.values[0][i];
            }
            setColumns(cols);
            setRowNum(rowNumber);
          }
          return res.data.values;
        });
    };
    fetchData();
  }, [rowNumber]);

  const handleNav = async (nextPage: number, jumpTo?: number) => {
    let row = rowNum + nextPage;
    if (jumpTo){
      row = jumpTo;
    }
    if (row < 2 ) {
      return;
    }
    setRowNum(row);
    const range = `A${row}:Z${row}`;
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
          const cols:Column[] = [...columns];
          for(let i = 0; i < res.data.values[0].length; i++){
            cols[i].text = res.data.values[0][i];
          }
          setColumns(cols);
        }

        return res.data.values;
      });
    return response;
  };

  const getColumnWithName=(name: string)=>{
    if (columns.filter((col: Column)=>col.title ===name)[0]){
      return columns.filter((col: Column)=>col.title ===name)[0].text;
    }
    return "";
  }

  const getColumns = ()=>{
    const hideColumns = ["Prompt ID", "Industry", "Use Case", "Writer"]
    return columns.filter((col: Column)=>!hideColumns.includes(col.title ||"") );
  }

  return (
    <div>
      {/* USER Part of the application*/}
      <div>
        <div className="flex flex-row items-center ml-4 mt-4">
          <div className="ml-4 font-semibold">Prompt ID: {getColumnWithName("Prompt ID")}</div>
          <label className="ml-4 mr-4 font-semibold">Row</label>
          <SlArrowLeft onClick={() => handleNav(-1)} />
          <input
            type="text"
            value={rowNum}
            className="w-10 ml-4 mr-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            onChange={(e) => handleNav(0, Number(e.target.value))}
          />
          <SlArrowRight onClick={() => handleNav(1)} />
          <div className="ml-4 font-semibold flex flex-row text-orange-500">
            <div className="ml-4">
              <div>Use Case</div>
            </div>
            <div className="ml-4 flex flex-col">
              <div>Industry</div>
              <div className="text-black">{getColumnWithName("Industry")}</div>
            </div>
            <div className="ml-4">Model Output</div>
            <div className="ml-4">Expected Output</div>
          </div>

        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {getColumns().map((c: Column, idx) => (
            <div key={idx} className="ml-4">
              <Question column={c} rowNumber={rowNum}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
