import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  category,
  uploadToPinata,
  setImage,
  creator
}) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToPinata(acceptedFile[0]);
    setFileUrl(url);
    setImage(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });
  return (
    <div className={Style.DropZone}>
    {fileUrl ? (
        <div className={Style.DropZone_upload_img}>
          <button className={Style.DropZone_box_del_img} onClick={()=>setFileUrl(null)}> x </button>
          <img src={fileUrl} alt="nft image"/>
        </div>
      ) : (
        <div className={Style.DropZone_box} {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={Style.DropZone_box_input}>
            <p>{title}</p>
            <div className={Style.DropZone_box_input_img}>
              <Image
                src={images.upload}
                alt="upload"
                width={100}
                height={100}
                className={Style.DropZone_box_input_img_img}
              />
            </div>
            <p>{heading}</p>
            <p>{subHeading}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
