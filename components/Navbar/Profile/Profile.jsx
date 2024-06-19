import React from "react";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownload, TbDoorExit } from "react-icons/tb";
import Link from "next/link";
import Style from "./Profile.module.css";
import images from "../../../img";
import { logoutAction } from "../../../API/manageUser";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Profile = ({ user, currentAccount }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    const action = logoutAction();
    dispatch(action);
    router.push("/");
  };

  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <img
          src={user ? `${user.photo}` : images.item11}
          alt="user profile"
          width={50}
          height={50}
          objectFit="cover"
          className={Style.profile_account_img}
        />

        <div className={Style.profile_account_info}>
          <p>{user.name}</p>
          <small>{user.configWalletAddress.slice(0, 15)}...</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <Link href={{ pathname: "/author" }}>
            <div className={Style.profile_menu_one_item}>
              <FaUserAlt />
              <p>My Profile</p>
            </div>
          </Link>
          <Link href={{ pathname: "/author" }}>
            <div className={Style.profile_menu_one_item}>
              <FaRegImage />
              <p>My Items</p>
            </div>
          </Link>
          <Link href={{ pathname: "/account" }}>
            <div className={Style.profile_menu_one_item}>
              <FaUserEdit />
              <p>Edit Profile</p>
            </div>
          </Link>
        </div>

        <div className={Style.profile_menu_two}>
          <Link href={{ pathname: "/contactus" }}>
            <div className={Style.profile_menu_one_item}>
              <MdHelpCenter />
              <p>Help</p>
            </div>
          </Link>
          <Link href={{ pathname: "/aboutus" }}>
            <div className={Style.profile_menu_one_item}>
              <TbDownload />
              <p>About Us</p>
            </div>
          </Link>
          <div
            className={Style.profile_menu_one_item}
            onClick={() => handleLogOut()}
          >
            <TbDoorExit />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
