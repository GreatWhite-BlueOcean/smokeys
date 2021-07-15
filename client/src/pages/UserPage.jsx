import React, { useState, useEffect } from "react";
import AddNewItem from "../components/AddNewItem/AddNewItem.jsx";
import CurrentTrades from "../components/CurrentTrades/CurrentTrades.jsx";
import Overview from "../components/Overview/Overview.jsx";
import PastTrades from "../components/PastTrades/PastTrades.jsx";
import RatingsReviews from "../components/RatingsReviews/RatingsReviews.jsx";

const UserPage = ({ currentUser, getLoggedInUser }) => {
  const [currentTab, setCurrentTab] = useState("overview");

  const handleTabClick = (event) => {
    document.querySelectorAll(".start")[1].classList.remove("start");
    document.querySelectorAll(".start")[0].classList.remove("start");
    setCurrentTab(event.target.parentElement.getAttribute("value"));
    event.target.parentElement.classList.add("start");
    event.target.classList.add("start");
  };

  return (
    <div className="user-page-container">
      <h1>Welcome, {currentUser.firstName}!</h1>
      <section>
        <ul className="tab-list">
          <li value="overview" className="tab start">
            <p className="tab-text start" onClick={handleTabClick}>
              Overview
            </p>
          </li>
          <li value="current-trades" className="tab">
            <p className="tab-text" onClick={handleTabClick}>
              Current Items
            </p>
          </li>
          <li value="past-trades" className="tab">
            <p className="tab-text" onClick={handleTabClick}>
              Past Trades
            </p>
          </li>
          <li value="ratings-reviews" className="tab">
            <p className="tab-text" onClick={handleTabClick}>
              Ratings/Reviews
            </p>
          </li>
          <li value="add-new-item" className="tab">
            <p className="tab-text" onClick={handleTabClick}>
              Add New Item
            </p>
          </li>
        </ul>
<<<<<<< HEAD
        {currentTab === "overview" && <Overview />}
        {currentTab === "current-trades" && <CurrentTrades currentUser={currentUser} />}
        {currentTab === "past-trades" && <PastTrades currentUser={currentUser}/>}
        {currentTab === "add-new-item" && <AddNewItem currentUser={ currentUser } />}
        {currentTab === "ratings-reviews" && <RatingsReviews currentUser={ currentUser }/>}
=======
        {currentTab === "overview" && (
          <Overview
            currentUser={currentUser}
            getLoggedInUser={getLoggedInUser}
          />
        )}
        {currentTab === "current-trades" && (
          <CurrentTrades currentUser={currentUser} />
        )}
        {currentTab === "past-trades" && <PastTrades />}
        {currentTab === "add-new-item" && (
          <AddNewItem currentUser={currentUser} />
        )}
        {currentTab === "ratings-reviews" && (
          <RatingsReviews currentUser={currentUser} />
        )}
>>>>>>> 24ffe4533f823aba2b4bcb1d6b3d5fcd88cdb707
      </section>
    </div>
  );
};

export default UserPage;
