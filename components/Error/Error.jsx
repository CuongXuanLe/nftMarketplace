import React, { useState, useEffect, useContext } from "react";
import Style from "./Error.module.css";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Contexts/NFTMarketplaceContext";

const Error = ({ message, setDisplayError }) => {
  const { error, setOpenError } = useContext(NFTMarketplaceContext);
  const errorMessage = message ? message : error;
  return (
    <div
      className={Style.Error}
      onClick={() => (message ? setDisplayError(false) : setOpenError(false))}
    >
      <div className={Style.Error_box}>
        <div className={Style.Error_box_info}>
          <img
            alt="error"
            src={images.errorImg}
            width={200}
            height={200}
            className={Style.Error_box_info_img}
            objectFit="cover"
          />
          <p>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
