import React, { useState } from "react";
import {
  RiUserFollowFill,
  RiAwardLine,
} from "react-icons/ri";
import Style from "./FollowerTab.module.css";
import FollowerTabCard from "./FollowerTabCard/FollowerTabCard";
import images from "../../img";
import Link from "next/link";

const FollowerTab = ({ TopCreator }) => {
  const FollowingArray = [
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
      background: images.item4,
      user: images.user6,
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.item2,
      user: images.user2,
    },
  ];
  const NewsArray = [
    {
      background: images.item2,
      user: images.user1,
    },
    {
      background: images.item10,
      user: images.user2,
    },
    {
      background: images.item3,
      user: images.user3,
    },
    {
      background: images.item5,
      user: images.user4,
    },
    {
      background: images.item4,
      user: images.user5,
    },
    {
      background: images.item1,
      user: images.user6,
    },
    {
      background: images.item9,
      user: images.user7,
    },
    {
      background: images.creatorbackground8,
      user: images.user8,
    },
  ];

  const [activeTab, setActiveTab] = useState("popular");
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const openPopular = () => {
    setActiveTab("popular");
    if (!popular) {
      setPopular(true);
      setFollowing(false);
      setNews(false);
    }
  };
  const openFollower = () => {
    setActiveTab("follower");
    if (!following) {
      setPopular(false);
      setFollowing(true);
      setNews(false);
    }
  };
  const openNews = () => {
    setActiveTab("news");
    if (!news) {
      setPopular(false);
      setFollowing(false);
      setNews(true);
    }
  };

  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2>Top Creators List</h2>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button
              onClick={openPopular}
              className={activeTab === "popular" ? Style.active : ""}
            >
              <RiUserFollowFill /> Popular
            </button>
            <button
              onClick={openFollower}
              className={activeTab === "follower" ? Style.active : ""}
            >
              <RiUserFollowFill /> Following
            </button>
            <button
              onClick={openNews}
              className={activeTab === "news" ? Style.active : ""}
            >
              <RiAwardLine /> NoteWorthy
            </button>
          </div>
        </div>
      </div>

      {popular && (
        <div className={Style.followerTab_box}>
          {TopCreator.map((el, i) => (
            <Link href={{ pathname: "/author", query: el }}>
              <a>
                <FollowerTabCard key={i + 1} i={i} el={el} />
              </a>
            </Link>
          ))}
        </div>
      )}

      {following && (
        <div className={Style.followerTab_box}>
          {FollowingArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {news && (
        <div className={Style.followerTab_box}>
          {NewsArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      <div className={Style.followerTab_member}>
        <div className={Style.followerTab_member_box}>
          <a href="#">Show me more</a>
          <a href="#">Become, author</a>
        </div>
      </div>
    </div>
  );
};

export default FollowerTab;
