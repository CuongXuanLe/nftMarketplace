import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";
import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

import { NFTMarketplaceContext } from "../Contexts/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [getType, setType] = useState("");
  const [sortMethod, setSortMethod] = useState("");

  useEffect(() => {
    try {
      fetchNFTs().then((item) => {
        setNfts(item?.reverse());
        setNftsCopy(item);
      });
    } catch (error) {
      setError("Please reload the browser");
    }
  }, []);

  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  const onClearSearch = () => {
    if (nfts?.length && nftsCopy?.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter setType={setType} setSortMethod={setSortMethod} />
      {nfts?.length > 0 ? (
        <NFTCardTwo
          NFTData={nfts}
          location={"search"}
          getType={getType}
          sortMethod={sortMethod}
        />
      ) : (
        <Loader />
      )}
      {nfts?.length > 0 ? <Slider nfts={nfts.slice(0, 10)} /> : <Loader />}
      <Brand />
    </div>
  );
};

export default searchPage;
