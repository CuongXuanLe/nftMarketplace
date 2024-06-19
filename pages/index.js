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
  Loader,
} from "../components/componentsindex";
import { getTopCreator } from "../TopCreators/TopCreators";
import { NFTMarketplaceContext } from "../Contexts/NFTMarketplaceContext";
import { useSelector } from "react-redux";

const Home = () => {
  const { checkIfWalletConnected, currentAccount, fetchNFTs } = useContext(
    NFTMarketplaceContext
  );

  const user = useSelector((state) => state.auth.login.currentUser);
  // console.log("checkout: ", currentAccount);

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  const creators = getTopCreator(nfts);

  useEffect(() => {
    fetchNFTs().then((item) => {
      console.log(item);
      setNfts(item?.reverse());
      setNftsCopy(item);
    });
  }, []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <BigNFTSlider />
      {creators.length > 0 ? <FollowerTab TopCreator={creators} /> : <Loader />}
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      {nfts?.length > 0 ? <NFTCard NFTData={nfts} /> : <Loader />}
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
