import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Style from "./SliderCard.module.css";
import images from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile";

const SliderCard = ({ el, i, card_location}) => {
  return (
    <motion.div className={Style.sliderCard}>
      <div className={Style.sliderCard_box}>
      {card_location === 'HeroSection' ? <>
        <motion.div className={Style.sliderCard_box_img}>
            <Image
              src={el.background}
              className={Style.sliderCard_box_img_img}
              alt="slider profile"
              width={500}
              height={350}
              objectFit="cover"
            />
            <div className={Style.sliderCard_box_content_1}>
              <div className={Style.sliderCard_box_title_1}>
                <p>Quantum Cats</p>
                <span>HOT COLLECTION <span className={Style.organization_name}>BTC</span></span>
              </div>
              <div className={Style.sliderCard_box_description}>
                <p>The Quantum Cats by Taproot Wizards are on a mission to revive Satoshi's beloved pet and scripting function, OP_CAT.</p>
                <button className={Style.exploreButton}>Explore Collection</button>
              </div>
            </div>
          </motion.div>
      </> : 
      <>
        <motion.div className={Style.sliderCard_box_img}>
          <Image
            src={el.background}
            className={Style.sliderCard_box_img_img}
            alt="slider profile"
            width={500}
            height={300}
            objectFit="cover"
          />
        </motion.div>
        <div className={Style.sliderCard_box_title}>
          <p>NFT Video #1245</p>
          <div className={Style.sliderCard_box_title_like}>
            <small>1 0f 100</small>
          </div>
        </div>

        <div className={Style.sliderCard_box_price}>
          <div className={Style.sliderCard_box_price_box}>
            <small>Current Bid</small>
            <p>1.000 ETH</p>
          </div>

          <div className={Style.sliderCard_box_price_time}>
            <small>Reaming time</small>
            <p>3h : 15m : 20s</p>
          </div>
        </div>
        </>
      }
      </div>
    </motion.div>
  );
};

export default SliderCard;