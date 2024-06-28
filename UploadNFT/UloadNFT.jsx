import React, { useState, useContext, useEffect } from "react";
import { MdOutlineHttp } from "react-icons/md";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex.js";
import { DropZone } from "../UploadNFT/uploadNFTIndex.js";
import { useRouter } from "next/router";
import { NFTMarketplaceContext } from "../Contexts/NFTMarketplaceContext.js";

const UloadNFT = ({ uploadToPinata, createNFT }) => {
  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [image, setImage] = useState(null);
  const [creator, setCreator] = useState("")
  const router = useRouter();

  console.log('currentAccount: ', currentAccount)

  const categoryArry = [
    {
      category: "Sports",
    },
    {
      category: "Arts",
    },
    {
      category: "Digital",
    },
    {
      category: "Time",
    },
    {
      category: "Photography",
    },
  ];

  useEffect(() => {
    setCreator(currentAccount)
  }, [currentAccount])

  return (
    <div className={Style.upload}>
    <div className={Style.upload_box}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        name={name}
        website={website}
        description={description}
        category={category}
        setImage={setImage}
        uploadToPinata={uploadToPinata}
        creator={creator}
      />
    </div>

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Item Name</label>
          <input
            type="text"
            placeholder="Cognizance"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">Website</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>

            <input
              type="text"
              placeholder="https://rarible.com/collection/rari/0x1DfCEE225aD4DD33DAa7f511853a125ec2a27cd8/drops"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <p className={Style.upload_box_input_para}>
            NFT Market will include a link to this URL on this item's detail
            page, so that users can click to learn more about it. You are
            welcome to link to your own webpage with more details.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Choose collection</label>
          <p className={Style.upload_box_input_para}>
            Choose an exiting collection or create a new one
          </p>

          <div className={Style.upload_box_slider_div}>
            {categoryArry.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active == i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => (setActive(i + 1), setCategory(el.category))}
              >
                <p>{el.category} </p>
                <div 
                  className={`${Style.upload_box_slider_box_img_icon} ${
                  active == i + 1 ? Style.upload_box_slider_box_img_icon_active : ""
                }`}>
                    <TiTick />
                  </div>
              </div>
            ))}
          </div>
        </div>

        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={async () =>
              createNFT(
                name,
                price,
                image,
                description,
                router,
                website,
                category, 
                creator
              )
            }
            classStyle={Style.upload_box_btn_style}
          />
        </div>
      </div>
    </div>
  );
};

export default UloadNFT;
