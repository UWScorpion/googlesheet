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

  const handleUpdate = async (range: string) => {
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
  };

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
    <div className="flex justify-center">
      <div className="text-4xl">
        Welcome to Core Machine Learning Group at Global Logic
      </div>
    </div>
  );
}
