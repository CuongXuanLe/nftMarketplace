import React from "react";
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { Slider, Brand, Loader } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";
import { useSelector } from "react-redux";
const collection = () => {
  const usersData = useSelector((state) => state.users.getUsersData);
  const allNFTs = useSelector((state) => state.users.getAllNFTs);
  const users = useSelector((state) => state.auth.login?.currentUser);

  const currentUserNFT = usersData?.filter((el) => el._id === users._id);

  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      {currentUserNFT?.length > 0 ? (
        <CollectionProfile profileData={currentUserNFT[0]} />
      ) : (
        <Loader />
      )}
      <Filter />
      {allNFTs?.length > 0 ? (
        <NFTCardTwo NFTData={currentUserNFT[0]?.nfts} />
      ) : (
        <Loader />
      )}
      {allNFTs?.length > 0 ? (
        <Slider nfts={allNFTs.slice(0, 10)} />
      ) : (
        <Loader />
      )}
      <Brand />
    </div>
  );
};

export default collection;
