import React, { useState } from "react";
import Style from "./AuthorTaps.module.css";
const AuthorTaps = ({
  setCollectiables,
  setCreated,
  setLike,
  hiddenOwnNFT
}) => {
  const [activeBtn, setActiveBtn] = useState(1);
  const openTab = (e) => {
    const btnText = e.target.innerText;
    
    if (btnText == "Listed NFTs") {
      setCollectiables(true);
      setCreated(false);
      setLike(false);
      setActiveBtn(1);
    } else if (btnText == "Own NFT") {
      setCollectiables(false);
      setCreated(true);
      setLike(false);
      setActiveBtn(2);
    } else if (btnText == "Liked") {
      setCollectiables(false);
      setCreated(false);
      setLike(true);
      setActiveBtn(3);
    }
  };

  return (
    <div className={Style.AuthorTaps}>
      <div className={Style.AuthorTaps_box}>
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            <button
              className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Listed NFTs
            </button>
            {hiddenOwnNFT ?
            <button
              className={`${activeBtn == 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Own NFT
            </button> : <></>}
            <button
              className={`${activeBtn == 3 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Liked
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;
