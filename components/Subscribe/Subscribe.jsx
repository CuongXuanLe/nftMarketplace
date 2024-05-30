import React from "react";
import Style from "./Subscribe.module.css";

const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_heading}>
          <h2>Stay in the loop</h2>
          <h2>Get the latest insights</h2>
        </div>
        <div className={Style.subscribe_box_email}>
          <div className={Style.subscribe_box_input}>
            <input type="email" placeholder="Enter your email" />
            <button className={Style.subscribe_btn}>Sign up</button>
          </div>
          <p>By clicking send you'll receive occasional emails from NFT marketPlace.
          You always have the choice to unsubscribe within every email you receive.</p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;