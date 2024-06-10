import React, { useState, useEffect, useContext } from "react";
import Style from "./HeroSection.module.css";
import { Slider } from "../componentsindex";
import { NFTMarketplaceContext } from "../../Contexts/NFTMarketplaceContext";

const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.heroSection}>
      <h1>{titleData}</h1>
      <Slider location={"HeroSection"} />
    </div>
  );
};

export default HeroSection;
