import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Style from "./SliderCard.module.css";

const SliderCard = ({ el, i, card_location }) => {
  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    return { hours, minutes, seconds };
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const [time, setTime] = useState(getRandomTime());

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTime((prevTime) => {
        const { hours, minutes, seconds } = prevTime;
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(countdownInterval);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <motion.div className={Style.sliderCard}>
      <div className={Style.sliderCard_box}>
        {card_location === "HeroSection" ? (
          <>
            <motion.div className={Style.sliderCard_box_img}>
              <Image
                src={el.image}
                className={Style.sliderCard_box_img_img}
                alt="slider profile"
                width={500}
                height={350}
                objectFit="cover"
              />
              <div className={Style.sliderCard_box_content_1}>
                <div className={Style.sliderCard_box_title_1}>
                  <p>{el.name}</p>
                  <span>
                    HOT COLLECTION{" "}
                    <span className={Style.organization_name}>BTC</span>
                  </span>
                </div>
                <div className={Style.sliderCard_box_description}>
                  <p>
                    The Quantum Cats by Taproot Wizards are on a mission to
                    revive Satoshi's beloved pet and scripting function, OP_CAT.
                  </p>
                  <button className={Style.exploreButton}>
                    Explore Collection
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div className={Style.sliderCard_box_img}>
              <Image
                src={el.image}
                className={Style.sliderCard_box_img_img}
                alt="slider profile"
                width={500}
                height={300}
                objectFit="cover"
              />
            </motion.div>
            <div className={Style.sliderCard_box_title}>
              <p>{el.name}</p>
              <div className={Style.sliderCard_box_title_like}>
                <small>1 0f 100</small>
              </div>
            </div>

            <div className={Style.sliderCard_box_price}>
              <div className={Style.sliderCard_box_price_box}>
                <small>Current Bid</small>
                <p>{el.price} ETH</p>
              </div>

              <div className={Style.sliderCard_box_price_time}>
                <small>Remaining time</small>
                <p>
                  {formatTime(time.hours)}h : {formatTime(time.minutes)}m :{" "}
                  {formatTime(time.seconds)}s
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SliderCard;
