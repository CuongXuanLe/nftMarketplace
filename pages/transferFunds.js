import React, { useState, useEffect, useContext } from "react";
import { FaEthereum, FaUserAlt } from "react-icons/fa";
import Image from "next/image";
import Style from "../styles/transferFunds.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button, Loader } from "../components/componentsindex";

import { NFTMarketplaceContext } from "../Contexts/NFTMarketplaceContext";

const transferFunds = () => {
  const {
    currentAccount,
    transferEther,
    accountBalance,
    loading,
    transactions,
    getAllTransactions,
  } = useContext(NFTMarketplaceContext);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");
  const [message, setMessage] = useState("");
  const [readMessage, setReadMessage] = useState("");
  const [openBox, setOpenBox] = useState(false);

  useEffect(() => {
    getAllTransactions();
  }, []);

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
            <Image src={images.item11} width={400} height={400} alt="images" />
          </div>
          <div className={Style.transfer_box_box_right}>
            <h2>Now you can transfer ether</h2>
            <div className={Style.transfer_box_box_right_info}>
              <p className={Style.transfer_box_box_right_info_deskTop}>
                Account: {currentAccount.slice(0, 25)}..
              </p>
              <p className={Style.transfer_box_box_right_info_mobile}>
                Account {currentAccount.slice(0, 25)}..
              </p>
              <p>Balance: {parseFloat(accountBalance).toFixed(5)} ETH</p>
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

        {currentAccount ? (
          <h1 className={Style.transfer_box_h1}> Transaction History</h1>
        ) : (
          <h1 className={Style.transfer_box_h1}>
            {" "}
            Connect your account to see the latest transactions
          </h1>
        )}
        <div className={Style.transfer_box_history}>
          {transactions.map((el, i) => {
            return (
              <div className={Style.transfer_box_history_item} key={i + 1}>
                <Image
                  src={images.item0}
                  width={200}
                  height={200}
                  alt="image"
                />
                <div className={Style.transfer_box_history_item_info}>
                  <p>
                    <span>Transfer ID:</span> #{i + 1} {el.timestamp}
                  </p>
                  <p>
                    <span>Amount:</span> {el.amount}
                  </p>
                  <p>
                    <span>From:</span> {el.addressFrom.slice(0, 13)}..
                  </p>
                  <p>
                    <span>To ID:</span> {el.addressTo.slice(0, 13)}..
                  </p>
                  <Button
                    btnName="Message"
                    handleClick={() => (
                      setReadMessage(el.message), setOpenBox(true)
                    )}
                    className={Style.readButton}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {openBox == false ? (
          ""
        ) : (
          <div className={Style.messageBox} onClick={() => setOpenBox(false)}>
            <div className={Style.messageBox_box}>
              <h1>Transaction Message</h1>
              <p>{readMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default transferFunds;
