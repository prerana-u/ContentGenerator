import homebg from "../Images/homebg.png";
import { useState } from "react";
import MessageGenerator from "./MessageGenerator";
import OptionsPage from "./OptionsPage";

export default function GeneratorPage() {
  const [dataFromChild, setDataFromChild] = useState("OptionsPage");

  function handleDataFromChild(data) {
    setDataFromChild(data);
    console.log(data);
  }

  return (
    <div className="box-border">
      <div className="flex relative flex-col items-center">
        <img
          className="object-cover"
          src={homebg}
          alt="Background"
          style={{ width: "100%" }}
        />

        <div className="absolute inset-0 flex mx-auto  w-[180px] h-fit sm:w-[400px] md:w-[400px]">
          <h2 className="text-white text-xl  leading-8 sm:text-[30px] md:text-[40px] lg:text-[48px] xl:text-[44px] sm:leading-relaxed font-bold text-center">
            <span className="text-[20px] text-[#FFF0C1] md:text-[28px] min-[320px]:text-sm sm:text-[24px]">
              WELCOME TO
            </span>
            <br /> EVENT CONTENT GENERATOR
          </h2>
        </div>
        {dataFromChild === "OptionsPage" ? (
          <OptionsPage
            sendDataToParent={handleDataFromChild}
            className="mb-10"
          />
        ) : (
          <MessageGenerator
            type={dataFromChild}
            className="mb-10 w-auto h-auto"
          />
        )}
      </div>
    </div>
  );
}
