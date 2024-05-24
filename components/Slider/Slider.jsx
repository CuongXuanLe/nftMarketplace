import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import Style from "./Slider.module.css";
import SliderCard from "./SliderCard/SliderCard";
import images from "../../img";

const Slider = ({location}) => {
  const FollowingArray = [
    {
      background: images.item1,
      user: images.user3,
    },
    {
      background: images.item2,
      user: images.user4,
    },
    {
      background: images.item3,
      user: images.user5,
    },
    {
      background: images.item8,
      user: images.user6,
    },
    {
      background: images.item4,
      user: images.user1,
    },
    {
      background: images.item5,
      user: images.user2,
    },
    {
      background: images.item6,
      user: images.user1,
    },
    {
      background: images.item7,
      user: images.user2,
    },
    {
      background: images.item10,
      user: images.user1,
    },
    {
      background: images.item9,
      user: images.user2,
    },
  ];
  const [width, setWidth] = useState(0);
  const dragSlider = useRef();

  useEffect(() => {
    setWidth(dragSlider.current.scrollWidth - dragSlider.current.offsetWidth);
  });

  console.log('check setWidth: ', width)

  useEffect(() => {
    const smoothScroll = (start, end, duration) => {
      if (start === end) return;
      const difference = end - start;
      const perTick = difference / duration * 10;

      requestAnimationFrame(() => {
        dragSlider.current.scrollLeft = start + perTick;
        if (dragSlider.current.scrollLeft !== end) {
          smoothScroll(start + perTick, end, duration - 10);
        }
      });
    };

    const autoScroll = setInterval(() => {
      const { current } = dragSlider;
      const scrollAmount = window.innerWidth > 1800 ? 384 : 384;
      if (current.scrollLeft + current.clientWidth >= current.scrollWidth) {
        smoothScroll(current.scrollLeft, 0, 500);
      } else {
        smoothScroll(current.scrollLeft, current.scrollLeft + scrollAmount, 500);
      }
    }, 5000);

    return () => clearInterval(autoScroll);
  }, []);

  const handleScroll = (direction) => {
    const { current } = dragSlider;
    const scrollAmount = window.innerWidth > 1800 ? 384 : 384;

    if (direction === "left") {
      if (current.scrollLeft === 0) {
        current.scrollTo({ left: current.scrollWidth, behavior: "smooth" });
      } else {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    } else {
      if (current.scrollLeft + current.offsetWidth >= current.scrollWidth) {
        current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className={Style.slider}>
        {location === 'HeroSection' ? 
          <div className={Style.slider_box_header}>
            <div className={Style.container_slider_box_button_btn_icon_1}>
              <div className={Style.slider_box_button_btn_icon_1}
                onClick={() => handleScroll("left")}
              >
                <TiArrowLeftThick />
              </div>
              <div
                className={Style.slider_box_button_btn_icon_1}
                onClick={() => handleScroll("right")}
              >
                <TiArrowRightThick />
              </div>
            </div>
            <motion.div className={Style.slider_box_items_header} ref={dragSlider}>
              <motion.div
                ref={dragSlider}
                className={Style.slider_box_item}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
              >
                {FollowingArray.map((el, i) => (
                  <SliderCard key={i + 1} el={el} i={i} card_location={location}/>
                ))}
              </motion.div>
            </motion.div>
          </div>
            :
          <div className={Style.slider_box}>
            <h2>Top Collector Buys Today</h2>
            <div className={Style.slider_box_button}>
              <p>Click on play icon & enjoy Nfts Video</p>
              <div className={Style.slider_box_button_btn}>
                <div
                  className={Style.slider_box_button_btn_icon}
                  onClick={() => handleScroll("left")}
                >
                  <TiArrowLeftThick />
                </div>
                <div
                  className={Style.slider_box_button_btn_icon}
                  onClick={() => handleScroll("right")}
                >
                  <TiArrowRightThick />
                </div>
              </div>
            </div>
            <motion.div className={Style.slider_box_items} ref={dragSlider}>
              <motion.div
                ref={dragSlider}
                className={Style.slider_box_item}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
              >
                {FollowingArray.map((el, i) => (
                  <SliderCard key={i + 1} el={el} i={i} card_location={location}/>
                ))}
              </motion.div>
            </motion.div>
          </div>
        }
      </div>
  );
};

export default Slider;
