import React from "react";
import "./progress-bar.scss";
import Icon from "../../SVGs";

interface Props{
  level:number
}
const ProgressLevel: React.FC<Props> = ({level}) => {
  return (
    <>
     <div className="progress-container">
      <img src={Icon.BabyStage1Left} alt="baby center" />
      <div className="progress-level-wrapper">
        <div className={`progress-${level}`}></div>
      </div>
      <img src={Icon.BabyStage1Right} alt="baby center" />
    </div>
    </>
   
  );
};

export default ProgressLevel;
