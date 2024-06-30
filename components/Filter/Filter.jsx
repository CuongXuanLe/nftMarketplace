import React, { useState } from "react";
import { FaFilter, FaAngleDown, FaAngleUp } from "react-icons/fa";
import Style from "./Filter.module.css";

const Filter = ({ setType }) => {
  const [filter, setFilter] = useState(true);
  const [active, setActive] = useState("All");

  const openFilter = () => {
    if (!filter) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  };

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
            onClick={() => openFilter()}
          >
            <FaFilter />
            <span>Filter</span> {filter ? <FaAngleDown /> : <FaAngleUp />}
          </div>
          <div className={Style.backHover}></div>
          <ul className={Style.filter_box_func}>
            <li>Sort by A-Z</li>
            <li>Sort by Z-A</li>
            <li>Low to High</li>
            <li>High to Low</li>
          </ul>
        </div>
      </div>
      <div className={Style.filter_box_items}></div>
    </div>
  );
};

export default Filter;
