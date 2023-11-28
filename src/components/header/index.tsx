import React from "react";
import './header.scss'
import Icon from "../../SVGs";
const Header: React.FC = () => {
  return (
    <div className="header">
      {" "}
      <img src={Icon.BabyLeft} alt="baby with nurse left" />{" "}
      <img src={Icon.BabyRight} alt="baby with nurse right" />
    </div>
  );
};

export default Header;
