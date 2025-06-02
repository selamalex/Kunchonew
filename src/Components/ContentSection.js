import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import childrenImage from "../Assets/images/children-image.png";
import "./context.css";

function ContentSection() {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Welcome to Kuncho Kids Entertainment";
  const typingSpeed = 100;

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => {
        if (index < fullText.length) {
          index++;
          return fullText.slice(0, index);
        } else {
          clearInterval(typingInterval);
          return prev;
        }
      });
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="content-section" id="home">
      <div className="text-content">
        <h1>{displayedText}</h1>
        <p>
          Kuncho is a digital platform designed to provide fun, engaging, and
          educational content for children in Ethiopia. Our mission is to make
          learning accessible and enjoyable through interactive stories, games,
          and activities, all carefully curated to be safe and age-appropriate.
        </p>
      </div>
      <div className="image-content">
        <img src={childrenImage} alt="Kuncho Kids" className="content-image" />
      </div>
    </section>
  );
}

export default ContentSection;
