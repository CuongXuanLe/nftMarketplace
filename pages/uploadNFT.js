import React, { useContext } from "react";
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";

import { NFTMarketplaceContext } from "../Contexts/NFTMarketplaceContext";

const uploadNFT = () => {
  const { uploadToPinata, createNFT } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New NFT</h1>
          <p>
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>
        <div className={Style.uploadNFT_box_form}>
          <UploadNFT uploadToPinata={uploadToPinata} createNFT={createNFT} />
        </div>
      </div>
    </div>
  );
};

export default uploadNFT;
