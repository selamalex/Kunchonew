import { useNavigate } from "react-router-dom";
import React from "react";

import Header from "../Components/Header";
import CardsSection from "../Components/CardsSection";
import ContentSection from "../Components/ContentSection";
import ImageStack from "../Components/ImageStack";
import Footer from "../Components/Footer";
const GeneralHome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <ContentSection />
      <ImageStack />
      <div style={{ margin: "40rem 0" }}></div> {/* Add spacing div */}
      <CardsSection />
      <Footer />
    </div>
  );
};

export default GeneralHome;
