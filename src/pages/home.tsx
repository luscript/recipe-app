import React from "react";
import "../styles/global.css";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  return (
    <div className="flex items-center justify-center flex-grow overflow-y-auto">
      <TypeAnimation
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
      />
    </div>
  );
};

export default Home;
