import React, { useState, useEffect } from "react";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Style from "./NFTCard.module.css";
import Link from "next/link";

const NFTCard = ({ NFTData }) => {
  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    return { hours, minutes, seconds };
  };

  const initialTimes = NFTData.map(() => getRandomTime());
  const [times, setTimes] = useState(initialTimes);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimes((prevTimes) =>
        prevTimes.map((time) => {
          const { hours, minutes, seconds } = time;
          if (seconds > 0) {
            return { ...time, seconds: seconds - 1 };
          } else if (minutes > 0) {
            return { hours, minutes: minutes - 1, seconds: 59 };
          } else if (hours > 0) {
            return { hours: hours - 1, minutes: 59, seconds: 59 };
          } else {
            return { hours: 0, minutes: 0, seconds: 0 };
          }
        })
      );
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className={Style.NFTCard}>
      {NFTData.map((el, i) => (
        <Link href={{ pathname: "/NFT-details", query: el }}>
          <div className={Style.NFTCard_box} key={i + 1}>
            <div className={Style.NFTCard_box_img}>
              <Image
                src={el.image}
                alt="NFT images"
                width={600}
                height={600}
                className={Style.NFTCard_box_img_img}
              />
            </div>

            <div className={Style.NFTCard_box_update}>
              <div className={Style.NFTCard_box_update_left}></div>

              <div className={Style.NFTCard_box_update_right}>
                <div className={Style.NFTCard_box_update_right_info}>
                  <small>Remaining time</small>
                  <p>
                    {formatTime(times[i].hours)}h :{" "}
                    {formatTime(times[i].minutes)}m :{" "}
                    {formatTime(times[i].seconds)}s
                  </p>
                </div>
              </div>
            </div>

            <div className={Style.NFTCard_box_update_details}>
              <div className={Style.NFTCard_box_update_details_price}>
                <div className={Style.NFTCard_box_update_details_price_box}>
                  <h4>
                    {el?.name?.slice(0, 10)}.. #{el.tokenId}
                  </h4>

                  <div
                    className={Style.NFTCard_box_update_details_price_box_box}
                  >
                    <div
                      className={Style.NFTCard_box_update_details_price_box_bid}
                    >
                      <small>Current Bid</small>
                      <p>{el.price} ETH</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Style.NFTCard_box_update_details_category}>
                <BsImages />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCard;
