import React, { useState, useEffect } from "react";
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3,
} from "react-icons/bs";
import Style from "./Collection.module.css";
import DaysComponent from "./DaysComponents/DaysComponents";
import images from "../../img";
import Link from "next/link";

const Collection = ({ result }) => {
  const [activeButton, setActiveButton] = useState("popular");
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const newsArray = [
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.item8,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.item9,
      user: images.user6,
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
  ];
  const followingArray = [
    {
      background: images.item1,
      user: images.user1,
    },
    {
      background: images.item10,
      user: images.user2,
    },
    {
      background: images.item2,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      background: images.creatorbackground7,
      user: images.user7,
    },
    {
      background: images.creatorbackground8,
      user: images.user8,
    },
  ];

  const openPopular = () => {
    setActiveButton("popular");
    if (!popular) {
      setPopular(true);
      setFollowing(false);
      setNews(false);
    }
  };

  const openFollower = () => {
    setActiveButton("following");
    if (!following) {
      setPopular(false);
      setFollowing(true);
      setNews(false);
    }
  };

  const openNews = () => {
    setActiveButton("news");
    if (!news) {
      setPopular(false);
      setFollowing(false);
      setNews(true);
    }
  };

  return (
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>Top List Creators</h2>
        <div className={Style.collection_collections}>
          <div className={Style.collection_collections_btn}>
            <button
              onClick={() => openPopular()}
              className={activeButton === "popular" ? Style.active : ""}
            >
              <BsFillAlarmFill /> 24 hours
            </button>
            <button
              onClick={() => openFollower()}
              className={activeButton === "following" ? Style.active : ""}
            >
              <BsCalendar3 /> 7 days
            </button>
            <button
              onClick={() => openNews()}
              className={activeButton === "news" ? Style.active : ""}
            >
              <BsFillCalendarDateFill /> 30 days
            </button>
          </div>
        </div>
      </div>
      {popular && (
        <div className={Style.collection_box}>
          {result.map((el, i) => (
            <Link href={{ pathname: "/collection", query: el }}>
              <a>
                <DaysComponent key={i + 1} i={i} el={el} />
              </a>
            </Link>
          ))}
        </div>
      )}

      {following && (
        <div className={Style.collection_box}>
          {followingArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {news && (
        <div className={Style.collection_box}>
          {newsArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
