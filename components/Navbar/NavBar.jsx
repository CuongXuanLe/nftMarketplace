import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Profile, SideBar } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Contexts/NFTMarketplaceContext";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateAction, logoutAction } from "../../API/manageUser.js";

const NavBar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [error, setError] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [getNFTs, setGetNFTs] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

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
  const allNFTs = useSelector((state) => state.users.getAllNFTs);
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

  useEffect(() => {
    const filteredNFTs = allNFTs.filter((nft) => {
      let convertName = nft.name.toLowerCase();
      const searchResult = convertName.includes(searchTerm);
      return searchResult;
    });
    setGetNFTs(filteredNFTs);
  }, [searchTerm, allNFTs]);

  return (
    <div className={`${Style.navbar} ${isSticky ? Style.sticky : ""}`}>
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
              <p>Discover</p>
            </div>
            <div className={Style.navbar_container_right_discover_box}>
              <Discover user={user} />
            </div>
          </div>

          <div className={Style.navbar_container_right_help}>
            <div className={Style.navbar_container_right_help_text}>
              <p>Support</p>
            </div>
            <div className={Style.navbar_container_right_help_box}>
              <HelpCenter user={user} />
            </div>
          </div>
        </div>

        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <BsSearch className={Style.search_icon} />
              <input
                type="text"
                placeholder="Search NFT"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchTerm ? (
              <div className={Style.navbar_container_results}>
                {getNFTs.length > 0 ? (
                  getNFTs.map((item, i) => (
                    <div className={Style.navbar_container_results_item}>
                      <img src={item.image} alt="item" />
                      <div
                        className={Style.navbar_container_results_item_title}
                      >
                        <strong>{item.name}</strong>
                        <p>
                          <strong>Price:</strong> {item.price} MATIC
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={Style.navbar_search_notFound}>
                    <p>Not found NFTs</p>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
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
                  className={Style.navbar_container_right_profile}
                />
              </div>
              <div className={Style.backHover}></div>
              <div className={Style.navbar_container_right_profile_box_opts}>
                <Profile user={user} currentAccount={currentAccount} />
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
