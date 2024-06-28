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
import { useDispatch } from "react-redux";
import { manageService } from "../API/manageService";
import { getUsersData, getAllNFTs, getUsersSuccess } from "../Redux/userSlice";

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const [allUsers, setAllUsers] = useState();

  const { checkIfWalletConnected, fetchNFTs } = useContext(
    NFTMarketplaceContext
  );
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    try {
      const res = await manageService.getUsers();
      setAllUsers(res.data.data.users);
      dispatch(getUsersSuccess(res.data.data.users));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getAllUsers();
    checkIfWalletConnected();
  }, []);

  const creators = getTopCreator(nfts);

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item?.reverse());
    });
  }, []);

  const mapUsersToNFTs = (allUsers, nfts) => {
    if (allUsers?.length > 0 && nfts?.length > 0) {
      return allUsers?.map((user) => {
        const userNFTs = nfts?.filter(
          (nft) => nft.seller.toLowerCase() === user.configAddress.toLowerCase()
        );
        return {
          ...user,
          nfts: userNFTs,
        };
      });
    }
  };

  const result = mapUsersToNFTs(allUsers, nfts);
  dispatch({ type: "user/getUsersData", dataUsers: getUsersData(result) });
  dispatch({ type: "user/getAllNFTs", dataNFTs: getAllNFTs(nfts) });

  return (
    <div className={Style.homePage}>
      <HeroSection NFTData={nfts} />
      {result?.length > 0 ? <BigNFTSlider result={result} /> : <Loader />}
      {creators.length > 0 ? <FollowerTab TopCreator={creators} /> : <Loader />}
      {nfts?.length > 0 ? <Slider nfts={nfts.slice(0, 10)} /> : <Loader />}
      {result?.length > 0 ? <Collection result={result} /> : <Loader />}
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
