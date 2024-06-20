import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";
import Style from "./collectionProfile.module.css";
import images from "../../img";

const collectionProfile = ({ profileData }) => {
  const cardArray = [1, 2, 3, 4];
  console.log("profileData: ", profileData);
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image
            src={profileData?.photo || images.item11}
            alt="nft image"
            width={800}
            height={800}
            objectFit="cover"
            className={Style.collectionProfile_box_left_img}
          />
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <h1>
            {profileData?.name} #{profileData?._id.slice(-2)}
          </h1>
          <p>{profileData?.description}</p>

          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el, i) => (
              <div
                className={Style.collectionProfile_box_middle_box_item}
                key={i + 1}
              >
                <small>Floor price</small>
                <p>${i + 1}95,4683</p>
                <span>+ {i + 2}.11%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default collectionProfile;
