import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link, useNavigate } from "react-router-dom";
export default function CenterComp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const API_KEY = process.env.API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleFileUpload = (event) => {
    var fileName = document.getElementById("file").value.toLowerCase();
    if (
      !fileName.endsWith(".jpg") &&
      !fileName.endsWith(".png") &&
      !fileName.endsWith(".jpeg")
    ) {
      alert("You can upload image files only.");
      document.getElementById("file").value = "";
      return false;
    } else {
      setSelectedFile(event.target.files[0]);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const checkFile = () => {};

  async function function1() {
    setIsOpen(!isOpen);

    // For text-and-images input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Tell me about this picture in less than 5 sentences.";

    const fileInputEl = document.querySelector("input[type=file]");
    const imageParts = await Promise.all(
      [...fileInputEl.files].map(fileToGenerativePart)
    );

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    setMessage(text);
    console.log(text);

    document.getElementById("message").innerHTML =
      "<span>About your event: <span/> <br/>" + text;
    document.getElementById("continuebtn").style.display = "block";
  }

  const navigateTo = () => {
    navigate("/generate", { state: { text: message } });
  };

  return (
    <div class=" flex justify-center xl:absolute inset-0 xl:mx-auto xl:top-[240px]">
      <div class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 h-fit w-[350px] min-[320px]:w-[300px] md:w-[450px] mt-11 2xl:mt-0 flex flex-col items-center">
        <h3 class="text-xl md:text-3xl text-center font-medium mt-3">
          Upload a poster for your event!
        </h3>
        {isOpen ? (
          <div class="">
            <div class="flex flex-column items-center justify-center">
              <p
                id="message"
                class="mt-10 text-justify text-sm md:text-md  md:w-[350px] w-fit"
              >
                Loading.. Please wait.
              </p>
            </div>
            <br />
            <div class="flex md:flex-row flex-col items-center justify-center">
              <button
                onClick={togglePopup}
                class="bg-[#FFC100] hover:bg-[#ffa852] text-white font-bold py-2 px-4 rounded mt-6 w-[150px]"
              >
                Upload Again
              </button>
              <button
                onClick={navigateTo}
                id="continuebtn"
                class="bg-[#FFC100] hover:bg-[#ffa852] text-white font-bold py-2 px-4 rounded mt-6 md:ml-10 w-[150px] hidden"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div class=" mb-24">
            <input
              type="file"
              id="file"
              class="mt-24"
              onChange={handleFileUpload}
            />
            <button
              onClick={function1}
              class="bg-[#FFC100] hover:bg-[#ffa852] text-white font-bold py-2 px-4 rounded mt-3"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
