import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import Style from "./DaysComponents.module.css";
import empty from "../../../img/images-empty.png";

const DaysComponents = ({ el }) => {
  const total = el?.nfts
    ?.map((newItem) => Number(newItem.price))
    ?.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  return (
    <div className={Style.daysComponent}>
      <div className={Style.daysComponent_box}>
        <div className={Style.daysComponent_box_img_container}>
          <div className={Style.daysComponent_box_img}>
            <Image
              src={el?.nfts[0]?.image}
              className={Style.daysComponent_box_img_img}
              alt="profile background"
              width={500}
              height={300}
              objectFit="cover"
            />
          </div>

          <div className={Style.daysComponent_box_profile}>
            <Image
              src={el?.nfts[1]?.image || empty}
              alt="profile"
              width={200}
              height={200}
              className={Style.daysComponent_box_img_1}
              objectFit="cover"
            />
            <Image
              src={el?.nfts[2]?.image || empty}
              alt="profile"
              width={200}
              height={200}
              className={Style.daysComponent_box_img_2}
              objectFit="cover"
            />
            <Image
              src={el?.nfts[3]?.image || empty}
              alt="profile"
              width={200}
              height={200}
              className={Style.daysComponent_box_img_3}
              objectFit="cover"
            />
          </div>
        </div>
        <div className={Style.daysComponent_box_title}>
          <h2>#{el?.nfts?.length} Collection</h2>
          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <Image
                src={el?.photo}
                alt="profile"
                width={30}
                height={30}
                objectFit="cover"
                className={Style.daysComponent_box_title_info_profile_img}
              />
              <div>
                <p>Creator</p>
                <span>
                  {el.name}
                  <small>
                    <MdVerified color={"rgb(32, 129, 226)"} />
                  </small>
                </span>
              </div>
            </div>

            <div className={Style.daysComponent_box_title_info_price}>
              <small>{total} ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
