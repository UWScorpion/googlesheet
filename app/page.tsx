"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { PromptData } from "./common/constants";

export default function Home() {
  const [data, setData] = useState({
    seedPrompt: "",
    seedPromptInstructions: "",
    seedPromptAnalysis: "",
  });

  const handleSubmit =async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log("data", data);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="seed-prompt">Seed Prompt</label>
          <textarea
            value={data.seedPrompt}
            onChange={(e) => setData({ ...data, seedPrompt: e.target.value })}
            className="outline ml-2"
            name="seed-prompt"
            id="seed-prompt"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="seed-prompt-instructions">
            Seed prompt instructions
          </label>
          <textarea
            value={data.seedPromptInstructions}
            onChange={(e) =>
              setData({ ...data, seedPromptInstructions: e.target.value })
            }
            className="outline ml-2"
            name="seed-prompt-instructions"
            id="seed-prompt-instructions"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="seed-prompt-analysis">Analysis of Seed Prompt</label>
          <textarea
            value={data.seedPromptAnalysis}
            onChange={(e) =>
              setData({ ...data, seedPromptAnalysis: e.target.value })
            }
            className="outline ml-2"
            name="seed-prompt-analysis"
            id="seed-prompt-analysis"
          />
        </div>
        <button type="submit" >Save</button>
      </form>
    </>
  );
}
