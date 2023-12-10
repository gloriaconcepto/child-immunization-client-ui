import React from "react";
import './formcontainer.scss'
import Icon from "../../SVGs";
const FormContainer: React.FC = () => {
    return (
      <div className="formcontainer">
        <div className="img-center-wrapper">
        <img src={Icon.BabyCenter} alt="baby center" className="img-center"/> 
          </div>
          
      </div>
    );
  };

  export default FormContainer;
  