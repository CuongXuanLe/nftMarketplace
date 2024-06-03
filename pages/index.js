import React from "react";
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Collection,
  Filter,
  NFTCard,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
} from "../components/componentsindex";

const Home = () => {
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
      <NFTCard />
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
