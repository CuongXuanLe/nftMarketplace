import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { MdVerified, MdTimer } from "react-icons/md";
import Style from "./NFTCardTwo.module.css";
import Link from "next/link";

const NFTCardTwo = ({ NFTData, location }) => {
  return (
    <div className={Style.NFTCardTwo}>
      {NFTData?.map((el, i) => (
        <Link href={{ pathname: "/NFT-details", query: el }} key={i + 1}>
          <div className={Style.NFTCardTwo_box} key={i + 1}>
            <div className={Style.NFTCardTwo_box_like}>
              <div className={Style.NFTCardTwo_box_like_box}>
                <div className={Style.NFTCardTwo_box_like_box_box}>
                  <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                </div>
              </div>
            </div>

            <div className={Style.NFTCardTwo_box_img}>
              <Image
                src={el.image}
                alt="NFT"
                width={500}
                height={500}
                objectFit="cover"
                className={Style.NFTCardTwo_box_img_img}
              />
            </div>

            <p className={Style.NFTCardTwo_box_name_item}>{el?.name}</p>
            <div className={Style.NFTCardTwo_box_price}>
              <div className={Style.NFTCardTwo_box_price_box}>
                <small>Current Bid</small>
                <p>{el.price} ETH</p>
              </div>
              <p className={Style.NFTCardTwo_box_price_stock}>
                <MdTimer /> <span>{i + 1} hours left</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCardTwo;
