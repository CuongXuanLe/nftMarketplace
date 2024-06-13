import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/index.module.css";
import {
  HeroSection,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Collection,
  Filter,
  NFTCard,
  FollowerTab,
  Slider,
  Brand,
} from "../components/componentsindex";

import { NFTMarketplaceContext } from "../Contexts/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, checkContract } = useContext(
    NFTMarketplaceContext
  );

  useEffect(() => {
    // checkContract();
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item.reverse());
      setNftsCopy(item);
      console.log("check ???: ", nfts);
    });
  }, []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <BigNFTSlider />
      <FollowerTab />
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      <NFTCard NFTData={nfts} />
      <Title
        heading="Explore Categories"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
    </div>
  );
};

export default Home;
