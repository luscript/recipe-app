import React from "react";
import "../styles/global.css";
import { TypeAnimation } from "react-type-animation";
import shape from "../assets/squigly-line.png";

const Home = () => {
  return (
    <div className="shapeImg flex flex-col items-center justify-center flex-grow overflow-y-auto">
      <div className="flex justify-center w-4/5 md:w-1/2">
      <h1 className="homeTitle text-3xl sm:text-4xl lg:text-7xl text-center">Elevate your cooking game.</h1>
      </div>
      {/* <TypeAnimation
        sequence={[
          "The best recipe app saver",
          1000,
          "The best way to not forget your recipes",
          1000,
          "The best way to recall your nanys recipes",
          1000,
        ]}
        wrapper="span"
        speed={50}
        className="text-6xl font-bold"
        repeat={Infinity}
      /> */}
    </div>
  );
};

export default Home;
