import React from "react";
import "./tabs.css";
import { useTasks } from "../../context/tasksContext";
const Tabs = () => {
  const tabs = ["All", "Active", "Completed"];
  const { selectedTab, setSelectedTab } = useTasks();

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
