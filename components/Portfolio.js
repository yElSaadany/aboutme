import React from "react";
import { PortfolioCard } from "./Card";

export const Portfolio = () => {
  return (
    <div>
      <PortfolioCard
        title="Project 1"
        pathToImage="/cat.jpeg"
        imageAlt="some cat"
      />
    </div>
  );
};
