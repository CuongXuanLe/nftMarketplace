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
import { manageService } from "../API/manageService";

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [allUsers, setAllUsers] = useState();

  const user = useSelector((state) => state.auth.login.currentUser);
  const { checkIfWalletConnected, currentAccount, fetchNFTs } = useContext(
    NFTMarketplaceContext
  );

  const getAllUsers = async() => {
    try {
      const res = await manageService.getUsers()
      setAllUsers(res.data.data.users)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    getAllUsers()
    checkIfWalletConnected();
  }, []);

  const creators = getTopCreator(nfts);

  useEffect(() => {
    fetchNFTs().then((item) => {
      console.log(item);
      setNfts(item?.reverse());
    });
  }, []);

  const mapUsersToNFTs = (allUsers, nfts) => {
    if(allUsers?.length > 0 && nfts?.length > 0) {
      return allUsers?.map(user => {
        const userNFTs = nfts?.filter(nft => nft.seller.toLowerCase() === user.wallet.toLowerCase());
        return {
          ...user,
          nfts: userNFTs
        };
      });
    }
  };
  
  const result = mapUsersToNFTs(allUsers, nfts);

  return (
    <div className={Style.homePage}>
      <HeroSection NFTData={nfts}  />
      {result?.length > 0 ? <BigNFTSlider result={result}  /> : <Loader />}
      {creators.length > 0 ? <FollowerTab TopCreator={creators} /> : <Loader />}
      {nfts?.length > 0 ? <Slider nfts={nfts.slice(0, 10)} /> : <Loader />}
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
