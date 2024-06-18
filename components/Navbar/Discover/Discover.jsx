import React from "react";
import Link from "next/link";
import Style from "./Discover.module.css";

const Discover = ({ user }) => {
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "searchPage",
    },
    {
      name: "NFT Details",
      link: "NFT-details",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
    },
  ];

  const discoverUser = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "searchPage",
    },
    {
      name: "Author Profile",
      link: "author",
    },
    {
      name: "NFT Details",
      link: "NFT-details",
    },
    {
      name: "Account Setting",
      link: "account",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
    },
  ];

  const configRouteForUsers = user ? discoverUser : discover;
  return (
    <div>
      {configRouteForUsers.map((el, i) => (
        <Link href={{ pathname: `${el.link}` }} key={i + 1}>
          <div key={i + 1} className={Style.discover}>
            {el.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Discover;
