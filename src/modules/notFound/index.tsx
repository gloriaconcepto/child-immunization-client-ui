import React from "react";
import "./not-found.scss";
import Icon from "../../SVGs";

const PageNotFound: React.FC = () => {
  return (
    <div className="not-found-wrapper">
      {" "}
      <div style={{ position: "relative" }}>
        <img src={Icon.Icon404Icon} alt="404-Icon" />

        <img
          src={Icon.BabyCryIcon}
          alt="cry-baby-icon"
          className="baby-cry-id"
        />
        <img src={Icon.OppsIcon} alt="opps-Icon" className="opps-icon" />
        <div className="opps-text">
          <span>Ooops!</span>
        </div>
      </div>{" "}
    </div>
  );
};

export default PageNotFound;
