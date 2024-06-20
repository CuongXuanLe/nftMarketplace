import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillFire } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";
import Style from "./BigNFTSlider.module.css";
import Button from "../Button/Button";

const getRandomTime = () => {
  const days = Math.floor(Math.random() * 30);
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return { days, hours, minutes, seconds };
};

const BigNFTSlider = ({ result }) => {
  const [idNumber, setIdNumber] = useState(0);
  const [times, setTimes] = useState(result.map(() => getRandomTime()));

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimes((prevTimes) =>
        prevTimes.map((time) => {
          let { days, hours, minutes, seconds } = time;
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
        })
      );
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  const inc = useCallback(() => {
    setIdNumber((prevId) => (prevId + 1) % result.length);
  }, [result.length]);

  const dec = useCallback(() => {
    setIdNumber((prevId) => (prevId - 1 + result.length) % result.length);
  }, [result.length]);

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{result[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                src={result[idNumber]?.photo}
                alt="profile image"
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>Creator</p>
                <h4>
                  {result[idNumber]?.name}{" "}
                  <span>
                    <MdVerified color={"rgb(32, 129, 226)"} />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>
                  {result[idNumber]?.nfts[0]?.collection
                    ? result[idNumber]?.nfts[0]?.collection
                    : "null"}
                </h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>{result[idNumber]?.nfts[0]?.price} ETH</p>
            </div>

            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>Auction ending in</span>
            </p>

            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{formatTime(times[idNumber]?.days)}</p>
                <span>Days</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{formatTime(times[idNumber]?.hours)}</p>
                <span>Hours</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{formatTime(times[idNumber]?.minutes)}</p>
                <span>mins</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{formatTime(times[idNumber]?.seconds)}</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_button}>
              <Button btnName="Place" handleClick={() => {}} />
              <Button btnName="View" handleClick={() => {}} />
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLines
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <img
              src={result[idNumber]?.nfts[0]?.image}
              alt="NFT IMAGE"
              className={Style.bigNFTSlider_box_right_box_img}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSlider;
