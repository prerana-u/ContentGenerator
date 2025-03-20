import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation } from "react-router-dom";

export default function OptionsPage({ sendDataToParent, sendSpecstoParent }) {
  const [data, setData] = useState(undefined);
  const [specs, setSpecs] = useState("Type Here...");
  const options = [
    "Event Invitation",
    "Event Promotional Content",

    "Event Report",
    "Congratulatory Message",
  ];
  const onOptionChangeHandler = (event) => {
    setData(event.target.value);
    //console.log("User Selected Value - ", event.target.value);
  };

  function handleClick(e) {
    e.preventDefault();
    sendDataToParent(data);
    sendSpecstoParent(specs);
  }

  return (
    <div class=" flex justify-center xl:absolute inset-0 xl:mx-auto xl:top-[240px]">
      <div class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 h-fit w-[350px] min-[320px]:w-[300px] md:w-[450px] mt-11 2xl:mt-0 flex flex-col items-center">
        <h3
          class="text-md md:text-xl text-center font-medium mt-3"
          id="headertext"
        >
          Customize Your Content
        </h3>
        <form className="mt-10">
          <label className="mt-10">Choose the type of content</label>
          <div className="flex flex-col justify-center items-center mb-[20px]">
            <select
              onChange={onOptionChangeHandler}
              className="md:w-[350px] w-[250px] border border-black mt-3 p-2"
            >
              <option>Please choose one option</option>
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
          </div>

          <label>Mention any specific requirements</label>
          <div class="flex flex-col justify-center items-center mb-[20px]">
            <textarea
              name="specs"
              defaultValue="Type Here.."
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              class="border border-black mt-3 p-4 md:w-[350px] w-[250px]"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              className="bg-[#FFC100] hover:bg-[#ffa852] text-white font-bold py-2 px-4 rounded mt-6 w-[200px]"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
