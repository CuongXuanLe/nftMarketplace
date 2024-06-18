import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";

const Form = ({ user, photo }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [description, setDescription] = useState();
  const [website, setWebsite] = useState();
  const [walletAddress, setWalletAddress] = useState();

  const handleUpdateProfile = () => {
    const formData = {
      name: name,
      email: email,
      description: description,
      website: website,
      photo: photo,
      walletAddress: walletAddress,
    };

    console.log("formData: ", formData);
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder={user.name}
              className={Style.Form_box_input_userName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
                type="text"
                placeholder={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="something about yourself in few words ..."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input
                type="text"
                placeholder="website"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">Wallet address</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder="0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8"
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_btn}>
            <Button
              btnName="Upload profile"
              handleClick={() => handleUpdateProfile()}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
