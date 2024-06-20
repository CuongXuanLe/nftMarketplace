import React from "react";
import Image from "next/image";
import Style from "./Brand.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";

const Brand = () => {
  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
          <h1>Earn free crypto with NFT Market</h1>
          <p>A creative agency that lead and inspire.</p>

          <div className={Style.Brand_box_left_btn}>
            <a href="/uploadNFT">
              <Button btnName="Create" onClick={() => handleClick()} />
            </a>
            <a href="/">
              <Button btnName="Discover" onClick={() => handleClick()} />
            </a>
          </div>
        </div>
        <div className={Style.Brand_box_right}>
          <Image
            src={images.item11}
            alt="brand logo"
            width={800}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default Brand;
