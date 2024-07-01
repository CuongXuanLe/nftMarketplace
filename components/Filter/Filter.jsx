import React, { useState } from "react";
import { FaFilter, FaAngleDown, FaAngleUp } from "react-icons/fa";
import Style from "./Filter.module.css";

const Filter = ({ setType, setSortMethod }) => {
  const [active, setActive] = useState("All");
  const [isHovered, setIsHovered] = useState(false);

  const categoryArry = [
    {
      category: "All",
    },
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

  const handleFilterChange = (event) => {
    setType(event);
  };

  const handleSortChange = (event) => {
    setSortMethod(event);
  };

  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          {categoryArry.map((item, i) => (
            <button
              className={item.category === active ? Style.active : null}
              onClick={() => {
                setActive(item.category);
                handleFilterChange(item.category);
              }}
            >
              {item.category}
            </button>
          ))}
        </div>

        <div className={Style.filter_box_right}>
          <div
            className={Style.filter_box_right_box}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FaFilter />
            <span>Filter</span> {isHovered ? <FaAngleDown /> : <FaAngleUp />}
          </div>
          <div className={Style.backHover}></div>
          <ul className={Style.filter_box_func}>
            <li onClick={() => handleSortChange("a-z")}>Sort by A-Z</li>
            <li onClick={() => handleSortChange("z-a")}>Sort by Z-A</li>
            <li onClick={() => handleSortChange("low-high")}>Low to High</li>
            <li onClick={() => handleSortChange("high-low")}>High to Low</li>
          </ul>
        </div>
      </div>
      <div className={Style.filter_box_items}></div>
    </div>
  );
};

export default Filter;
