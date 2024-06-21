import React, {useState, useEffect, useContext} from "react";
import { useRouter } from "next/router";
import { Category, Brand, Title } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

const NFTDetails = () => {
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
    if(!router.isReady) return;
    setNft(router.query)
  }, [router.isReady])
  return (
    <div>
      <NFTDetailsPage nft={nft}/>
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
