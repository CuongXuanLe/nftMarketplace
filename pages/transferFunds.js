import React, { useState, useEffect, useContext } from "react";
import { FaEthereum, FaUserAlt } from "react-icons/fa";

import Style from "../styles/transferFunds.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button, Loader } from "../components/componentsindex";

import { NFTMarketplaceContext } from "../Contexts/NFTMarketplaceContext";

const transferFunds = () => {
  const { currentAccount, transferEther, loading } = useContext(
    NFTMarketplaceContext
  );
  const [transferAmount, setTransferAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");
  const [message, setMessage] = useState("");
  const [readMessage, setReadMessage] = useState("");
  const [openBox, setOpenBox] = useState(false);

  const transactions = [2312, 12312, 12, 3, 211];

  return (
    <div className={Style.transfer}>
      <div className={Style.transfer_box}>
        <h1>Transfer Ether</h1>
        <p>
          Cillum eiusmod reprehenderit consequat esse nisi. Id cupidatat officia
          officia veniam anim incididunt ut anim incididunt. Ut ad ex tempor
          aliqua reprehenderit. Labore elit mollit aute eiusmod voluptate velit
          voluptate commodo irure aliqua velit laborum. Officia tempor consequat
          labore irure Lorem est. Occaecat enim duis dolor nulla. Excepteur
          consequat mollit sunt ut nisi magna commodo Lorem ut officia esse.
        </p>
        <div className={Style.transfer_box_box}>
          <div className={Style.transfer_box_box_left}>
            <img src={images.transfer} width={400} height={400} alt="images" />
          </div>
          <div className={Style.transfer_box_box_right}>
            <h2>Now you can transfer ether</h2>
            <div className={Style.transfer_box_box_right_info}>
              <p className={Style.transfer_box_box_right_info_deskTop}>
                Account: {currentAccount}
              </p>
              <p className={Style.transfer_box_box_right_info_mobile}>
                Account {currentAccount.slice(1, 30)} ..
              </p>
              <p>Balance: 3355ETH</p>
            </div>

            <div className={Style.transfer_box_box_right_box}>
              <div className={formStyle.Form_box_input}>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <FaUserAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="address*"
                    onChange={(e) => setTransferAccount(e.target.value)}
                  />
                </div>
              </div>

              <div className={formStyle.Form_box_input}>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <FaEthereum />
                  </div>
                  <input
                    type="number"
                    min={1}
                    placeholder="ETH"
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder="your message in few words..."
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <Button
                  btnName="Transfer Funds"
                  handleClick={() =>
                    transferEther(transferAccount, transferAmount, message)
                  }
                  className={Style.button}
                />
              )}
            </div>
          </div>
        </div>
        <h1 className={Style.transfer_box_h1}> Transaction History</h1>
        <p>
          Adipisicing adipisicing exercitation nisi proident dolor non do
          laborum aute eu qui eiusmod voluptate nulla. Sit quis aute aute aute
          excepteur nisi aute adipisicing cupidatat. Commodo deserunt irure
          ullamco aliquip dolore eiusmod ullamco qui reprehenderit eiusmod.
          Ipsum tempor dolore ut reprehenderit enim ut tempor anim deserunt
          cupidatat aute anim.
        </p>
        <div className={Style.transfer_box_history}>
          {transactions.map((el, i) => {
            <div className={Style.transfer_box_history_item} key={i + 1}>
              <img src={images.item0} width={200} height={200} alt="image" />
              <div className={Style.transfer_box_history_item_info}>
                <p>
                  <span>Transfer ID:</span> #1
                </p>
                <p>
                  <span>Amount:</span> #1
                </p>
                <p>
                  <span>From:</span> #1
                </p>
                <p>
                  <span>To ID:</span> #1
                </p>
                <Button
                  btnName="Message"
                  handleClick={() => (
                    setReadMessage("checked"), setOpenBox(true)
                  )}
                  className={Style.readButton}
                />
              </div>
            </div>;
          })}
        </div>
        {openBox == false ? (
          ""
        ) : (
          <div className={Style.messageBox} onClick={() => setOpenBox(false)}>
            <div className={Style.messageBox_box}>
              <h1>Transaction Message</h1>
              <p>Hey your message</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default transferFunds;
