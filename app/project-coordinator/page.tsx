"use client";

import React from "react";
import { useEffect, useState } from "react";
import { ProjectCoordinatorColumn } from "../common/constants";
import User from "../user/page";
import loading from "../../public/loading.gif";
import { IoMdClose } from "react-icons/io";
import Dropdown from "../components/Dropdown";

const ProjectCoordinator = () => {
  const [columns, setColumns] = useState([] as ProjectCoordinatorColumn[]);
  const [rowNum, setRowNum] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const userList = ["abc@google.com", "bcd@gmail.com", "hello@google.com"];
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

  const handleClick = (row: number, col: number) => {
    // Prompt ID row.
    if (row === 0) {
      setRowNum(2 + col - 1);
    }
    if (row === 1) {
      console.log(row, col);
      setShowModal(true);
    }
  };

  const handleSave = async () => { };

  const getColumns = () => {
    const hideColumns = ["Use Case"];
    return columns.filter(
      (col: ProjectCoordinatorColumn) => !hideColumns.includes(col.title || "")
    );
  };
  return (
    <div>
      {columns.length > 0 ? (
        <div>
          <div className="font-bold ml-4 text-xl">PROJECT COORDINATOR VIEW</div>
          <table className="border-separate border-spacing-4 border mt-4 ml-4">
            <tbody>
              {getColumns().map((row: ProjectCoordinatorColumn, i) => (
                <tr key={i} className={`${i === 0 ? "cursor-pointer" : ""}`}>
                  {row.texts?.map((col: string, j) => (
                    <td
                      key={j}
                      className={`text-center ${j === 0 ? "font-semibold cursor-auto" : ""
                        } ${j !== 0 && (i === 0 || i === 1)
                          ? "hover:bg-gray-200"
                          : ""
                        }`}
                      onClick={() => handleClick(i, j)}
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-row">
            <div className="mt-20 font-bold ml-4 text-xl">USER VIEW</div>
          </div>
          <div className="border">
            <User rowNumber={rowNum} />
          </div>
        </div>
      ) : (
        <div>
          <img className="w-32" src={loading.src} alt="loading" />
          <div className="text-3xl">Loading</div>
        </div>
      )}
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Select Writer</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span>
                      <IoMdClose />
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <Dropdown title={"Select A Writer"} options={userList} />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProjectCoordinator;
