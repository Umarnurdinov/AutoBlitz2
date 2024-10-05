import React, { useRef, useEffect, useState } from "react";
import Card from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addData, filtrPrice } from "../../store/slices/data";
import "./cards.scss";
import { mileageFiltr } from "../../store/slices/filtr";
import toyota1 from "../../assets/camry.webp";
import toyota2 from "../../assets/camry2.webp";
import toyota3 from "../../assets/camry3.webp";
import bmwx51 from "../../assets/bmwx5.webp";
import bmwx52 from "../../assets/bmwx52.jpeg";
import bmwx53 from "../../assets/bmwx53.webp";
import mercedes1 from "../../assets/mercedes.jpeg";
import mercedes2 from "../../assets/mercedes2.jpeg";
import mercedes3 from "../../assets/mercedes3.jpeg";
import audi1 from "../../assets/mazda.webp";
import audi2 from "../../assets/mazda2.jpeg";
import audi3 from "../../assets/mazda3.webp";
import honda1 from "../../assets/honda.jpeg";
import honda2 from "../../assets/honda2.jpeg";
import honda3 from "../../assets/honda3.webp";
import mustang from "../../assets/bmwm.png";
import mustang2 from "../../assets/bmwm-2.avif";
import mustang3 from "../../assets/bmwm-3.jpeg";
import tahoe1 from "../../assets/jetour.jpeg";
import tahoe2 from "../../assets/jetour2.jpeg";
import tahoe3 from "../../assets/jetour3.jpeg";
import tesla1 from "../../assets/tesla3.webp";
import tesla2 from "../../assets/tesla3-2.avif";
import tesla3 from "../../assets/tesla3-3.jpeg";
import sonata1 from "../../assets/toyotaHigh.jpeg";
import sonata2 from "../../assets/toyotaHigh2.avif";
import sonata3 from "../../assets/toyotaHigh3.jpeg";
import lexus1 from "../../assets/lexusrx.jpeg";
import lexus2 from "../../assets/lexusrx2.jpeg";
import lexus3 from "../../assets/lexusrx3.jpeg";
function Cards() {
  const initialCars = [
    {
      id: 1,
      marka_name: "Toyota",
      car_model: "Camry",
      price: 2500000,
      images: [
        { image_url: `${toyota1}` },
        { image_url: `${toyota2}` },
        { image_url: `${toyota3}` },
      ],
      mileage: 50000,
      year_of_manufacture_name: 2020,
      transmission: "Автомат",
      checkpoints: "4WD",
    },
    {
      id: 2,
      marka_name: "BMW",
      car_model: "X5",
      price: 3500000,
      images: [
        { image_url: `${bmwx51}` },
        { image_url: `${bmwx52}` },
        { image_url: `${bmwx53}` },
      ],
      mileage: 80000,
      year_of_manufacture_name: 2019,
      transmission: "Механика",
      checkpoints: "RWD",
    },
    {
      id: 3,
      marka_name: "Mercedes",
      car_model: "C-Class",
      price: 3000000,
      images: [
        { image_url: `${mercedes1}` },
        { image_url: `${mercedes2}` },
        { image_url: `${mercedes3}` },
      ],
      mileage: 30000,
      year_of_manufacture_name: 2021,
      transmission: "Автомат",
      checkpoints: "FWD",
    },
    {
      id: 4,
      marka_name: "Audi",
      car_model: "A6",
      price: 2700000,
      images: [
        { image_url: `${audi1}` },
        { image_url: `${audi2}` },
        { image_url: `${audi3}` },
      ],
      mileage: 60000,
      year_of_manufacture_name: 2018,
      transmission: "Автомат",
      checkpoints: "AWD",
    },
    {
      id: 5,
      marka_name: "Honda",
      car_model: "Civic",
      price: 1800000,
      images: [
        { image_url: `${honda1}` },
        { image_url: `${honda2}` },
        { image_url: `${honda3}` },
      ],
      mileage: 40000,
      year_of_manufacture_name: 2020,
      transmission: "Механика",
      checkpoints: "FWD",
    },
    {
      id: 6,
      marka_name: "Ford",
      car_model: "Mustang",
      price: 4500000,
      images: [
        { image_url: `${mustang}` },
        { image_url: `${mustang2}` },
        { image_url: `${mustang3}` },
      ],
      mileage: 20000,
      year_of_manufacture_name: 2021,
      transmission: "Автомат",
      checkpoints: "RWD",
    },
    {
      id: 7,
      marka_name: "Chevrolet",
      car_model: "Tahoe",
      price: 5200000,
      images: [
        { image_url: `${tahoe1}` },
        { image_url: `${tahoe2}` },
        { image_url: `${tahoe3}` },
      ],
      mileage: 70000,
      year_of_manufacture_name: 2019,
      transmission: "Автомат",
      checkpoints: "AWD",
    },
    {
      id: 8,
      marka_name: "Tesla",
      car_model: "Model S",
      price: 6000000,
      images: [
        { image_url: `${tesla1}` },
        { image_url: `${tesla2}` },
        { image_url: `${tesla3}` },
      ],
      mileage: 15000,
      year_of_manufacture_name: 2022,
      transmission: "Электро",
      checkpoints: "AWD",
    },
    {
      id: 9,
      marka_name: "Hyundai",
      car_model: "Sonata",
      price: 2200000,
      images: [
        { image_url: `${sonata1}` },
        { image_url: `${sonata2}` },
        { image_url: `${sonata3}` },
      ],
      mileage: 55000,
      year_of_manufacture_name: 2020,
      transmission: "Автомат",
      checkpoints: "FWD",
    },
    {
      id: 10,
      marka_name: "Lexus",
      car_model: "RX 350",
      price: 4800000,
      images: [
        { image_url: `${lexus1}` },
        { image_url: `${lexus2}` },
        { image_url: `${lexus3}` },
      ],
      mileage: 60000,
      year_of_manufacture_name: 2019,
      transmission: "Автомат",
      checkpoints: "AWD",
    },
  ];

  const [cars, setCars] = useState(initialCars);
  const [loading, setLoading] = useState(false);
  const [showArrows, setShowArrows] = useState(window.innerWidth > 900);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      try {
        const res = await axios.get("http://13.49.229.91:8000/cars/");
        if (res.data && res.data.length > 0) {
          setCars(res.data);
          res.data.forEach((el) => dispatch(addData(el)));
          res.data
            .filter((el) => el.price < 2000000)
            .forEach((el) => {
              dispatch(filtrPrice(el));
            });
          res.data
            .filter((el) => el.mileage === 0)
            .forEach((el) => {
              dispatch(mileageFiltr(el));
            });
        }
      } catch (error) {
        console.error("Error fetching cars data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setShowArrows(window.innerWidth > 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -310, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 310, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="loaderToFullScreen">
        <div className="loaderHelp">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cards">
      <div className="container">
        <h2 className="recomendText">Рекомендуем вам</h2>
        {showArrows && (
          <button className="arrow arrow-left" onClick={scrollLeft}>
            {"<"}
          </button>
        )}
        <div className="cards-container" ref={containerRef}>
          {cars.map((card, index) => (
            <Card key={index} data={card} />
          ))}
        </div>
        {showArrows && (
          <button className="arrow arrow-right" onClick={scrollRight}>
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Cards;
