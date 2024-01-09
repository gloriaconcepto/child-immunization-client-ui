import React from "react";
import "./progress-bar.scss";
import Icon from "../../SVGs";
const ProgressLevel: React.FC = () => {
  return (
    <>
     <div className="progress-container">
      <img src={Icon.BabyStage1Left} alt="baby center" />
      <div className="progress-level-wrapper">
        <div className="progress"></div>
      </div>
      <img src={Icon.BabyStage1Right} alt="baby center" />
    </div>
    </>
   
  );
};

export default ProgressLevel;
