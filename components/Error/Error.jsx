import React, { useState, useEffect, useContext } from "react";
import Style from "./Error.module.css";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Contexts/NFTMarketplaceContext";

const Error = () => {
  const { error, setOpenError } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.Error} onClick={() => setOpenError(false)}>
      <div className={Style.Error_box}>
        <div className={Style.Error_box_info}>
          <image
            alt="error"
            src={images.item0}
            width={200}
            height={200}
            className={Style.Error_box_info_img}
            objectFit="cover"
          />
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
