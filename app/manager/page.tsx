"use client";
import { useEffect, useState } from "react";
import { projectCoordinators } from "../common/constants";
import { BiBarChartSquare } from "react-icons/bi";
import { IconContext } from "react-icons";
import Dropdown from "../components/Dropdown";
import { IoMdClose } from "react-icons/io";
import BarChart from "../components/BarChart";

const Manager = () => {
  const [maxRow, setMaxRow] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([] as number[]);
  const dataSet = [
    [0, 0, 0, 81, 1, 2, 4],
    [0, 0, 20, 1, 1, 2, 4],
    [1, 10, 20, 1, 10, 2, 4],
  ];
  useEffect(() => {
    const fetchData = async () => {
      const req = new Request(`/api/googlesheet?range=A1:Z1`);
      const response = await fetch(req, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(""),
      });

      const content = await response.json();
      const updatedRange = content.data.updates.updatedRange;
      if (updatedRange) {
        const lastRow = updatedRange[updatedRange.length - 1];
        setMaxRow(Number(lastRow) - 2);
      }

      return content;
    };
    fetchData();
  }, []);

  const handleChartIconClick = (idx: number) => {
    setShowModal(true);
    setData(dataSet[idx]);
  };

  return (
    <div>
      <div className="flex flex-row">
        <div>Total Prompts: {maxRow}</div>
        <div className="ml-4">
          Project Coordinators: {projectCoordinators.length}
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div>Prompt Range: </div>
        {projectCoordinators.map((_, idx) => (
          <div key={idx}>
            <span>Start</span>
            <input
              className="w-10 ml-4 mr-4 appearance-none border-2 border-gray-200 rounded py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
            />
            <span>End</span>
            <input
              className="w-10 ml-4 mr-4 appearance-none border-2 border-gray-200 rounded py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 mt-4">
        <div>Project Coordinator: </div>{" "}
        {projectCoordinators.map((_, idx) => (
          <Dropdown
            key={idx}
            title={"Select A Project Coordinator"}
            options={projectCoordinators}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 mt-4">
        <div>Project Status: </div>
        {projectCoordinators.map((_, idx) => (
          <IconContext.Provider
            key={idx}
            value={{ color: "black", size: "50px" }}
          >
            <BiBarChartSquare onClick={() => handleChartIconClick(idx)} />
          </IconContext.Provider>
        ))}
      </div>
      {showModal ? (
        <>
          <div className="flex justify-center items-center relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Prompt Status</h3>
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
                  <BarChart rawData={data} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Manager;
