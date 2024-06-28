import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { NFTMarketplaceContext } from "../../Contexts/NFTMarketplaceContext.js";
import { useSelector } from "react-redux";

const getRandomTime = () => {
  const days = Math.floor(Math.random() * 30);
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return { days, hours, minutes, seconds };
};

const NFTDescription = ({ nft }) => {
  const [NFTMenu, setNFTMenu] = useState(false);
  const [times, setTimes] = useState(getRandomTime());
  const getAllUsers = useSelector((state) => state.users?.users?.allUsers);

  const getOwnerData = getAllUsers?.filter(
    (user) => user?.configAddress === nft?.seller.toLowerCase()
  );

  const getCreatorData = getAllUsers?.filter(
    (user) => user?.configAddress === nft?.owner.toLowerCase()
  )
  
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimes((prevTimes) => {
        let { days, hours, minutes, seconds } = prevTimes;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(countdownInterval);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const router = useRouter();

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
    } else {
      setNFTMenu(false);
    }
  };

  const { buyNFT, currentAccount } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar /> Change price
                </a>
                <a href="#">
                  <BiTransferAlt /> Transfer
                </a>
                <a href="#">
                  <MdReportProblem /> Report abouse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep /> Delete item
                </a>
              </div>
            )}
          </div>
        </div>
        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {nft?.name} #{nft?.tokenId}
          </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={getCreatorData[0]?.photo || images.item11}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <Link href={{ pathname: "/author", query: nft }}>
                  <span>
                    {getCreatorData[0]?.name || "null"}{" "}
                    <MdVerified color={"rgb(32, 129, 226)"} />
                  </span>
                </Link>
              </div>
            </div>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={getOwnerData[0]?.photo || images.item11}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Owner</small> <br />
                <Link href={{ pathname: "/author", query: nft }}>
                  <span>
                    {getOwnerData[0]?.name || "null"}{" "}
                    <MdVerified color={"rgb(32, 129, 226)"} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            <p>
              <MdTimer /> <span>Auction ending in:</span>
            </p>

            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>{formatTime(times?.days)} :</p>
                <span>Days</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>{formatTime(times?.hours)} :</p>
                <span>hours</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>{formatTime(times?.minutes)} :</p>
                <span>mins</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>{formatTime(times?.seconds)}</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Current Bid</small>
                <p>{nft.price} ETH</p>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {currentAccount == nft.seller.toLowerCase() ? (
                <p>You cannot buy your own NFT</p>
              ) : currentAccount == nft.owner.toLowerCase() ? (
                <Button
                  icon=<FaWallet />
                  btnName="List on Marketplace"
                  handleClick={() =>
                    router.push(
                      `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                    )
                  }
                  classStyle={Style.button}
                />
              ) : (
                <Button
                  icon=<FaPercentage />
                  btnName="Buy NFT"
                  handleClick={() => buyNFT(nft)}
                  classStyle={Style.button}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
