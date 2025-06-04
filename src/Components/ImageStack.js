import React, { useEffect, useState } from "react";
import axios from "axios";
import "./image-layout.css";
import Firstimg from "../Assets/images/Firstimg.png";
import secondimg from "../Assets/images/secondimg.png";
import thirdimg from "../Assets/images/thirdimg.png";
import RightImage from "../Assets/images/98ea478a-415a-4bfa-875d-aeb5b10ef63a 1 (2).png";

const ImageStack = () => {
  const [stats, setStats] = useState({
    games: 0,
    books: 0,
    video: 0,
    childrenEnrolled: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admins/info")
      .then((res) => {
        const data = res.data;
        setStats({
          games: data.games || 0,
          books: data.books || 0,
          video: data.video || 0,
          childrenEnrolled: data.childrenEnrolled || 0,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
      });
  }, []);

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
          experiences.
        </p>
        <div className="stats">
          <div>
            <p className="number">{stats.video}</p>
            <p>Video for children</p>
          </div>
          <div>
            <p className="number">{stats.books}</p>
            <p>Books for your children</p>
          </div>
          <div>
            <p className="number">{stats.childrenEnrolled}</p>
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
