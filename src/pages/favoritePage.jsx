import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { useSelector } from "react-redux";
import Card from "../components/card/card";

function FavoritePage() {
  const cars = useSelector((state) => state.like.favorite);

  return (
    <>
      <Header />
      <div className="container">
        <div className="cards-container-for-favorite">
          {cars.map((card, index) => (
            <Card key={index} data={card} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FavoritePage;
