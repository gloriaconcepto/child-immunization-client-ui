import React from "react";
import { Link } from "react-router-dom";
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
        <div className="page-text">
          <span>PAGE NOT FOUND</span>
        </div>
        <Link to={"/"} className="nav-link-xx">
          <span>Go back and try a different link</span>
        </Link>
      </div>{" "}
    </div>
  );
};

export default PageNotFound;
