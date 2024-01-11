import React from "react";
import FormContainer from "../../components/formCard";
import './home.scss';
import Header from "../../components/header";
const HomeManagerView: React.FC = () => {
  return (<>
     <Header/>
     <div className="home"><FormContainer/></div>
  </>
 
  );
};

export default HomeManagerView;
