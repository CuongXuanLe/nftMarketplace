import React from "react";
import Style from "./AuthorNFTCardBox.module.css";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  like,
  nfts,
  myNFTS,
}) => {

  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && <NFTCardTwo NFTData={nfts} />}
      {created && <NFTCardTwo NFTData={myNFTS} />}
      {like && <NFTCardTwo NFTData={nfts} />}
    </div>
  );
};

export default AuthorNFTCardBox;
