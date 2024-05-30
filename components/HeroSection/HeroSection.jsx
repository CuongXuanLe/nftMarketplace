import React from "react";
import Style from "./HeroSection.module.css";
import { Slider } from "../componentsindex";

const HeroSection = () => {
  return (
    <div className={Style.heroSection}>
      <Slider location={'HeroSection'}/>
    </div>
  );
};

export default HeroSection;
