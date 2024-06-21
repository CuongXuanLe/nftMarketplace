import React, {useState, useEffect} from "react";
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { Slider, Brand, Loader, Collection } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const collection = () => {

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  })

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady, router.query]);
  
  const usersData = useSelector((state) => state.users.getUsersData);
  const allNFTs = useSelector((state) => state.users.getAllNFTs);

  const users = useSelector((state) => state.auth.login?.currentUser);

  const currentUserNFT = nft?._id?.length > 0 ? usersData?.filter((el) => el._id === nft?._id) :  usersData?.filter((el) => el._id === users?._id)

  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      {currentUserNFT?.length > 0 ? (
        <CollectionProfile profileData={currentUserNFT[0]} />
      ) : (
        <Loader />
      )}
      <Filter />
      {allNFTs?.length > 0 && currentUserNFT ? (
        <NFTCardTwo NFTData={currentUserNFT[0]?.nfts} />
      ) : (
        <Loader />
      )}
      {usersData?.length > 0 ? <Collection result={usersData} /> : <Loader />}
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
