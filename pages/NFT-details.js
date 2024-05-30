import React from "react";
import { Category, Brand, Title } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
const NFTDetails = () => {
  return (
    <div>
      <NFTDetailsPage />
      <Title
        heading="Explore Categories"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
