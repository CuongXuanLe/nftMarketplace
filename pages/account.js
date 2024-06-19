import React, { useState, useMemo, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../AccountPage/Form/Form";
import { useSelector } from "react-redux";
import axios from "axios";

const account = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const token = useSelector((state) => state.auth.login.token);
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFileUrl(response.data.fileUrl);
    } catch (error) {
      console.error("Error uploading the file", error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  const imageUpdate = () => {
    if (fileUrl) {
      return fileUrl;
    } else {
      const image = user.photo ? user.photo : images.item11;
      return image;
    }
  };

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile settings</h1>
        <p>
          You can set preferred display name, create your profile URL and manage
          other personal settings.
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <img
            src={imageUpdate()}
            crossorigin="anonymous"
            alt="account upload"
            width={150}
            height={150}
            objectFit="cover"
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>Change Image</p>
        </div>
        <div className={Style.account_box_from}>
          <Form user={user} photo={fileUrl} token={token} />
        </div>
      </div>
    </div>
  );
};

export default account;
