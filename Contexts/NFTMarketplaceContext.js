import React, { useEffect, useState, useContext } from "react";
import web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";

import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ Children }) => {
  const titleData = "hehe hehehehe";
  return (
    <NFTMarketplaceContext.Provider value={{ titleData }}>
      {Children}
    </NFTMarketplaceContext.Provider>
  );
};
