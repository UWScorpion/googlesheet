"use client";

import { useEffect, useState } from "react";
import { Column } from "../common/constants";
import Question from "../components/Question";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import Timer from "../components/Timer";
interface UserProps {
  rowNumber: number;
}
const User = ({ rowNumber }: UserProps) => {
  const [columns, setColumns] = useState([] as Column[]);
  const [rowNum, setRowNum] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      const req1 = new Request(`/api/googlesheet?range=Sheet1!A1:Z2`);
      const req2 = new Request(`/api/comment?range=Sheet1!A2:Z2`);
      const params = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await Promise.all([
        fetch(req1, params).then((res) => res.json()),
        fetch(req2, params).then((res) => res.json()),
      ]).then(([res1, res2]) => {
        const cols = res1.data.values[0].map((title: string) => ({ title }));
        for (let i = 0; i < res1.data.values[1].length; i++) {
          cols[i].text = res1.data.values[1][i];
          cols[i].columnNum = String.fromCharCode("A".charCodeAt(0) + i);
          if (res2.data.values[0][i] && res2.data.values[0][i].length > 2) {
            cols[i].comments = JSON.parse(res2.data.values[0][i]);
          }
        }
        setColumns(cols);
        return [res1, res2];
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const req1 = new Request(
        `/api/googlesheet?range=Sheet1!A${rowNumber || "2"}:Z${
          rowNumber || "2"
        }`
      );
      const req2 = new Request(
        `/api/comment?range=Sheet1!A${rowNumber || "2"}:Z${rowNumber || "2"}`
      );
      const params = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await Promise.all([
        fetch(req1, params).then((res) => res.json()),
        fetch(req2, params).then((res) => res.json()),
      ]).then(([res1, res2]) => {
        if (res1.data.values && columns.length > 0) {
          const cols: Column[] = [...columns];
          for (let i = 0; i < res1.data.values[0].length; i++) {
            cols[i].text = res1.data.values[0][i];
            cols[i].comments = [];
            if (
              res2.data.values &&
              res2.data.values[0][i] &&
              res2.data.values[0][i].length > 2
            ) {
              cols[i].comments = JSON.parse(res2.data.values[0][i]);
            }
          }
          setRowNum(rowNumber);
          setColumns(cols);
        }

        return [res1, res2];
      });
    };
    fetchData();
  }, [rowNumber]);

  const handleNav = async (nextPage: number, jumpTo?: number) => {
    let row = rowNum + nextPage;
    if (jumpTo) {
      row = jumpTo;
    }
    if (row < 2) {
      return;
    }
    setRowNum(row);
    const req1 = new Request(`/api/googlesheet?range=Sheet1!A${row}:Z${row}`);
    const req2 = new Request(`/api/comment?range=Sheet1!A${row}:Z${row}`);
    const params = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await Promise.all([
      fetch(req1, params).then((res) => res.json()),
      fetch(req2, params).then((res) => res.json()),
    ]).then(([res1, res2]) => {
      if (res1.data.values) {
        const cols: Column[] = [...columns];
        for (let i = 0; i < res1.data.values[0].length; i++) {
          cols[i].text = res1.data.values[0][i];
          cols[i].comments = [];
          if (
            res2.data.values &&
            res2.data.values[0][i] &&
            res2.data.values[0][i].length > 2
          ) {
            cols[i].comments = JSON.parse(res2.data.values[0][i]);
          }
        }
        setColumns(cols);
      }

      return [res1, res2];
    });
    return response;
  };

  const getColumnWithName = (name: string) => {
    if (columns.filter((col: Column) => col.title === name)[0]) {
      return columns.filter((col: Column) => col.title === name)[0].text;
    }
    return "";
  };

  const getColumns = () => {
    const hideColumns = ["Prompt ID", "Industry", "Use Case", "Writer"];
    return columns.filter(
      (col: Column) => !hideColumns.includes(col.title || "")
    );
  };

  return (
    <div>
      {/* USER Part of the application*/}
      <div>
        <div className="flex flex-row items-center ml-4 mt-4">
          <div className="ml-4 font-semibold">
            Prompt ID: {getColumnWithName("Prompt ID")}
          </div>
          <label className="ml-4 mr-4 font-semibold">Row</label>
          <SlArrowLeft onClick={() => handleNav(-1)} />
          <input
            type="text"
            value={rowNum}
            className="w-10 ml-4 mr-4 appearance-none border-2 border-gray-200 rounded py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            onChange={(e) => handleNav(0, Number(e.target.value))}
          />
          <SlArrowRight onClick={() => handleNav(1)} />
          <div className="ml-4 font-semibold flex flex-row text-orange-500">
            <div className="ml-4 flex flex-col">
              <div>Use Case</div>
              <div className="text-black">{getColumnWithName("Use Case")}</div>
            </div>
            <div className="ml-4 flex flex-col">
              <div>Industry</div>
              <div className="text-black">{getColumnWithName("Industry")}</div>
            </div>
            <div className="ml-4">Model Output</div>
            <div className="ml-4">Expected Output</div>
          </div>
          <Timer rowNumber={rowNum} />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {getColumns().map((c: Column, idx) => (
            <div key={idx} className="ml-4">
              <Question column={c} rowNumber={rowNum} />
            </div>
          ))}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
          Submit
        </button>
      </div>
    </div>
  );
};

export default User;
