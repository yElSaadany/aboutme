import React from "react";
import { PortfolioCard } from "./Card";

export const Portfolio = () => {
  return (
    <div style={portfolioStyle}>
      <PortfolioCard
        title="Passwords"
        pathToImage="/password_image.jpg"
        imageAlt="passwords project image"
        description={
          "Simple and efficient software to manage passwords. " +
          "It stores your credentials in an encrypted file and the key in another file. " +
          "Made with Python and a few cryptography libraries."
        }
        firstButton="GitHub"
        handleFirstButton={() => {
          window.open("https://github.com/yElSaadany/passwords", "_blank");
        }}
      />
      <PortfolioCard
        title="About Me"
        pathToImage="/aboutme.png"
        description={
          "This very website, I use it as a repository for my projects & portfolio. " +
          "When I don't know where to put something it usually ends up here."
        }
        firstButton="GitHub"
        handleFirstButton={() => {
          window.open("https://github.com/yElSaadany/aboutme", "_blank");
        }}
      />

      <PortfolioCard
        title="rolodex.online"
        description={
          "A web app to gather all of your contacts in one service" +
          " instead of having everybody scattered around LinkedIn, Facebook, etc."
        }
        firstButton="View Live"
        handleFirstButton={() => {
          window.open("https://agitated-kepler-e96de7.netlify.app/", "_blank");
        }}
      />
    </div>
  );
};

const portfolioStyle = {
  width: "70%",
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
};
