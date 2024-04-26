import homebg from "../Images/homebg.png";

import CenterComp from "./CenterComp";

export default function Mainpage() {
  return (
    <div>
      <div className="flex-initial relative flex-col items-center ">
        <img
          className="object-cover"
          src={homebg}
          alt="Background"
          style={{ width: "100%" }}
        />

        <div className="absolute inset-0 flex left-[25%] top-2 w-[180px] h-fit sm:left-[20%] sm:w-[400px] md:left-[200px] lg:left-[30%]  xl:left-[400px] 2xl:left-[580px] md:w-[400px]">
          <h2 className="text-white text-xl  leading-8 sm:text-[30px] md:text-[40px] lg:text-[48px] xl:text-[44px] sm:leading-relaxed font-bold text-center">
            <span className="text-[20px] text-[#FFF0C1] md:text-[28px] min-[320px]:text-sm sm:text-[24px]">
              WELCOME TO
            </span>
            <br /> EVENT CONTENT GENERATOR
          </h2>
        </div>
        <CenterComp />
      </div>
    </div>
  );
}
