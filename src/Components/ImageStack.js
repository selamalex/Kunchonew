import React from "react";
import "./image-layout.css";
import Firstimg from "../Assets/images/Firstimg.png";
import secondimg from "../Assets/images/secondimg.png";
import thirdimg from "../Assets/images/thirdimg.png";
import RightImage from "../Assets/images/98ea478a-415a-4bfa-875d-aeb5b10ef63a 1 (2).png";

const ImageStack = () => {
  return (
    <div className="container" id="about">
      <div className="image-stack wider">
        <div className="image-container">
          <img src={Firstimg} alt="First" className="image" />
          <h2 className="title">Who We Are</h2>
        </div>
        <div className="image-container">
          <img src={secondimg} alt="Second" className="image" />
        </div>
        <div className="image-container">
          <img src={thirdimg} alt="Third" className="image" />
        </div>
      </div>

      <div className="content">
        <h2>More About Us</h2>
        <h3>Special Care For Your Children</h3>
        <p>
          Kuncho is a digital platform designed to provide engaging,
          educational, and age-appropriate content for children in Ethiopia. It
          aims to enhance learning through accessible, safe, and interactive
          experiences
        </p>
        <div className="stats">
          <div>
            <p className="number">5</p>
            <p>Games for children</p>
          </div>
          <div>
            <p className="number">20</p>
            <p>Books for your children</p>
          </div>
          <div>
            <p className="number">565</p>
            <p>Kids Enrolled</p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="right-image reduced">
        <img src={RightImage} alt="Children Care" />
      </div>
    </div>
  );
};

export default ImageStack;
