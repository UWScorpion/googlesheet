"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    seedPrompt: "",
    seedPromptInstructions: "",
    seedPromptAnalysis: "",
  });
  const [rowNum, setRowNum] = useState("1");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const req = new Request(`/api/googlesheet`);
    const response = await fetch(req, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const content = await response.json();
    return content;
  };

  const handleUpdate=async (range:string)=>{
    const req = new Request(`/api/googlesheet?range=${range}`);
    const response = await fetch(req, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const content = await response;
    return content;
  }

  const getRow = async (range: string) => {
    const req = new Request(`/api/googlesheet?range=${range}`);
    const response = await fetch(req, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const content = await response.json().then((res) => res.data.values[0]);

    const [seedPrompt, seedPromptInstructions, seedPromptAnalysis] = content;
    const entry = {
      seedPrompt,
      seedPromptInstructions,
      seedPromptAnalysis,
    };
    setData(entry);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex ml-4">
          <div className="mt-4">
            <label
              htmlFor="seed-prompt"
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
            >
              Seed Prompt
            </label>
            <textarea
              value={data.seedPrompt}
              onChange={(e) => setData({ ...data, seedPrompt: e.target.value })}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="seed-prompt"
              id="seed-prompt"
            />
          </div>
          <div className="mt-4 px-4">
            <label
              htmlFor="seed-prompt-instructions"
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
            >
              Seed prompt instructions
            </label>
            <textarea
              value={data.seedPromptInstructions}
              onChange={(e) =>
                setData({ ...data, seedPromptInstructions: e.target.value })
              }
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="seed-prompt-instructions"
              id="seed-prompt-instructions"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="seed-prompt-analysis"
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
            >
              Analysis of Seed Prompt
            </label>
            <textarea
              value={data.seedPromptAnalysis}
              onChange={(e) =>
                setData({ ...data, seedPromptAnalysis: e.target.value })
              }
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="seed-prompt-analysis"
              id="seed-prompt-analysis"
            />
          </div>
        </div>
        <button
          type="submit"
          className="ml-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Add Entry
        </button>
      </form>
      <div className="mt-4">
        <input
          type="text"
          value={rowNum}
          className="w-10 ml-4 mr-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          onChange={(e) => setRowNum(e.target.value)}
        />
        <button
          type="button"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => getRow(`A${rowNum}:C${rowNum}`)}
        >
          Get Entry
        </button>
        <button
          type="button"
          className="ml-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={()=>handleUpdate(`A${rowNum}:C${rowNum}`)}
        >
          Update Entry
        </button>
      </div>
    </>
  );
}
