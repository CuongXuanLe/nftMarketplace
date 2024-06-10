import React from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownload } from "react-icons/tb";
import Link from "next/link";
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = () => {
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image
          src={images.user1}
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />

        <div className={Style.profile_account_info}>
          <p>check display name</p>
          <small>X038499382920203...</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <Link href={{ pathname: "/account" }}>
            <div className={Style.profile_menu_one_item}>
              <FaUserAlt />
              <p>My Profile</p>
            </div>
          </Link>
          <Link href={{ pathname: "/my-items" }}>
            <div className={Style.profile_menu_one_item}>
              <FaRegImage />
              <p>My Items</p>
            </div>
          </Link>
          <Link href={{ pathname: "/edit-profile" }}>
            <div className={Style.profile_menu_one_item}>
              <FaUserEdit />
              <p>Edit Profile</p>
            </div>
          </Link>
        </div>

        <div className={Style.profile_menu_two}>
          <Link href={{ pathname: "/help" }}>
            <div className={Style.profile_menu_one_item}>
              <MdHelpCenter />
              <p>Help</p>
            </div>
          </Link>
          <Link href={{ pathname: "/disconnet" }}>
            <div className={Style.profile_menu_one_item}>
              <TbDownload />
              <p>Disconnet</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
