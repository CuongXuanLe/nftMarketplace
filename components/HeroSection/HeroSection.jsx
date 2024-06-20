import React, { useState, useEffect, useContext } from "react";
import Style from "./HeroSection.module.css";
import { Slider, Loader } from "../componentsindex";

const HeroSection = ({NFTData}) => {
  return (
    <div className={Style.heroSection}>
      {NFTData?.length > 0 ? <Slider nfts={NFTData.slice(0, 10)} location={"HeroSection"} /> : <Loader/>}
    </div>
  );
};

export default HeroSection;
