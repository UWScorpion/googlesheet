import React from "react";
interface DropDownProps {
  title: string,
  options: string[],
}

const Dropdown = ({title, options}: DropDownProps) => {
  return (
    <div>
      <form className="max-w-sm mx-auto">
        <select
          id="countries"
          className="w-30 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={title}
        >
          {options.map((co, idx)=>(<option key = {idx} value={idx}>{co}</option>))}
        </select>
      </form>
    </div>
  );
};

export default Dropdown;
