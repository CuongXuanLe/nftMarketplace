import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Contexts/NFTMarketplaceContext";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateAction, logoutAction } from "../../API/manageUser.js";

const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [error, setError] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const navRef = useRef(null);

  const toggleMenu = (menuName) => {
    const btnText = menuName.target.innerText;
    if (btnText === "Discover") {
      setDiscover((prev) => !prev);
      setHelp(false);
      setProfile(false);
    } else if (btnText === "Support") {
      setHelp((prev) => !prev);
      setDiscover(false);
      setProfile(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToLogin = () => {
    router.push("/login");
  };

  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );

  const user = useSelector((state) => state.auth.login?.currentUser);
  const token = useSelector((state) => state.auth.login.token);

  const updateAddressWalletForUser = () => {
    if (!user.configAddress) {
      const formData = {
        configAddress: currentAccount,
      };
      const action = updateAction(formData, token);
      dispatch(action);
    } else if (currentAccount !== user.configAddress) {
      setError("wrong address Wallet");
      setDisplayError(true);
      const action = logoutAction();
      dispatch(action);
      router.push("/");
    }
  };

  useEffect(() => {
    if (currentAccount && user) {
      updateAddressWalletForUser();
    }
  }, [currentAccount, user]);

  return (
    <div
      className={`${Style.navbar} ${isSticky ? Style.sticky : ""}`}
      ref={navRef}
    >
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <Link href={{ pathname: `/` }}>
            <div className={Style.logo}>
              <Image
                src={images.logo}
                alt="NFT MARKET PLACE"
                height={75}
                width={125}
              />
            </div>
          </Link>
          <div className={Style.nav_split}></div>
          <div className={Style.navbar_container_right_discover}>
            <div className={Style.navbar_container_right_discover_text}>
              <p onClick={(e) => toggleMenu(e)}>Discover</p>
            </div>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover user={user} />
              </div>
            )}
          </div>

          <div className={Style.navbar_container_right_help}>
            <div className={Style.navbar_container_right_help_text}>
              <p onClick={(e) => toggleMenu(e)}>Support</p>
            </div>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter user={user} />
              </div>
            )}
          </div>
        </div>

        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <BsSearch onClick={() => {}} className={Style.search_icon} />
              <input type="text" placeholder="Search NFT" />
            </div>
          </div>

          <div className={Style.navbar_container_right_button}>
            {user?.configAddress ? (
              <Button
                btnName="Create"
                handleClick={() => router.push("/uploadNFT")}
              />
            ) : currentAccount ? (
              <Button
                btnName="Connect"
                handleClick={() => {
                  router.push("/signUp");
                }}
              />
            ) : (
              <Button
                btnName="Connect"
                handleClick={() => {
                  connectWallet();
                }}
              />
            )}
          </div>
          {user ? (
            <div className={Style.navbar_container_right_profile_box}>
              <div className={Style.navbar_container_right_profile}>
                <img
                  src={user.photo ? user.photo : images.item11}
                  alt="Profile"
                  width={40}
                  height={40}
                  objectFit="cover"
                  onClick={() => openProfile()}
                  className={Style.navbar_container_right_profile}
                />

                {profile && (
                  <Profile user={user} currentAccount={currentAccount} />
                )}
              </div>
            </div>
          ) : (
            <Button btnName="Login" handleClick={() => goToLogin()} />
          )}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}

      {openError ||
        (displayError && (
          <Error message={error} setDisplayError={setDisplayError} />
        ))}
    </div>
  );
};

export default NavBar;
