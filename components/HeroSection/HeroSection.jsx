import React from "react";
import Image from "next/image";
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";

const HeroSection = () => {
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box_left}>
        <h1>Discover, collect, and sell NFTs 🖼️</h1>
        <p>
          Discover the most outstanding NTFs in all topics of life. Creative
          your NTFs and sell them
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
