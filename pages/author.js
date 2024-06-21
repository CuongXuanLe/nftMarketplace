import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";
import { useSelector } from "react-redux";
import { NFTMarketplaceContext } from "../Contexts/NFTMarketplaceContext";
import { getTopCreator } from "../TopCreators/TopCreators";
import { useRouter } from "next/router";
import Link from "next/link";

const author = () => {
  const { fetchMyNFTsOrListedNFTs } = useContext(NFTMarketplaceContext);
  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);
  const [nfts, setNfts] = useState([]);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady, router.query]);

  const user = useSelector((state) => state.auth.login.currentUser);
  const usersData = useSelector((state) => state.users.getUsersData);
  const allNFTs = useSelector((state) => state.users.getAllNFTs);
  const creators = getTopCreator(allNFTs);

  const currentUser = nft?.seller?.length > 0 ? usersData?.filter((el) => el.configAddress === nft?.seller?.toLowerCase())[0] : user;

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
      setNfts(items);
    });
  }, []);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
      setMyNFTs(items);
    });
  }, []);

  const hiddenOwnNFT = nft?.seller ? nft?.seller?.toLowerCase() === user?.configAddress : true;

  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard currentAccount={currentUser} />
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        hiddenOwnNFT={hiddenOwnNFT}
      />

      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        nfts={nft?.seller?.length > 0 ? currentUser?.nfts : nfts}
        myNFTS={myNFTs}
      />
      <Title heading="Popular Creators" />
      <div className={Style.author_box}>
        {creators.map((el, i) => (
          <Link href={{ pathname: "/author", query: el }}>
            <a>
              <FollowerTabCard i={i} el={el} />
            </a>
          </Link>
        ))}
      </div>

      <Brand />
    </div>
  );
};

export default author;
