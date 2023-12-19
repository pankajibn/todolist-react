import React, { useState } from "react";
import "./tabs.css";
const Tabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = ["All", "Active", "Completed"];
  return (
    <div className="tabs_container">
      <ul className="tabs_list">
        {tabs.map((tab) => (
          <li
            className={selectedTab == tab ? `active` : ``}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
