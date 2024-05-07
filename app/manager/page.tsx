"use client";
import { useEffect, useState } from "react";
import { projectCoordinators } from "../common/constants";
import { BiBarChartSquare } from "react-icons/bi";
import { IconContext } from "react-icons";
import Dropdown from "../components/Dropdown";

const Manager = () => {
  const [maxRow, setMaxRow] = useState(0);
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
        <div>Project Coordinator: </div>   {projectCoordinators.map((_, idx) => (<Dropdown key ={idx} title={"Select A Project Coordinator"} options={projectCoordinators} />))}
      </div>
      <div className="grid grid-cols-4 mt-4">
        <div>Project Status: </div>
        {projectCoordinators.map((_, idx) => (
          <IconContext.Provider key ={idx} value={{ color: "black", size: "50px" }}>
            <BiBarChartSquare />
          </IconContext.Provider>
        ))}
      </div>
    </div>
  );
};

export default Manager;
