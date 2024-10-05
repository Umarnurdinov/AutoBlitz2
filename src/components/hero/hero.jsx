import React, { useState } from "react";
import axios from "axios";
import "./hero.scss";

function Hero() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState({
    username: "",
    phone_number: "",
    locate: `${address}`,
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState(""); // Состояние для хранения ошибки геолокации
  const [confirmAddress, setConfirmAddress] = useState(false); // Состояние для подтверждения адреса
  const [addressError, setAddressError] = useState(false); // Состояние для ошибки адреса

  function send() {
    axios
      .post("http://13.49.229.91:8000/fast-sell/", data)
      .then((res) => console.log(res))
      .catch((error) => {
        if (error.response) {
          console.log("Server Error:", error.response.data);
        } else if (error.request) {
          console.log("Network Error:", error.request);
        } else {
          console.log("Error:", error.message);
        }
      });
  }

  function autoLocation() {
    if ("geolocation" in navigator) {
      setLoading(true);
      setAddress(""); // Сброс адреса при новом запросе геолокации
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchAddress(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          setGeoError(
            "Геолокация отключена или доступ запрещен. Пожалуйста, включите её в настройках вашего браузера или устройства."
          );
          setShowModal(true); // Показываем модальное окно
        }
      );
    } else {
      setGeoError("Геолокация недоступна в этом браузере.");
      setShowModal(true); // Показываем модальное окно
    }
  }

  const fetchAddress = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
        setData((prevData) => ({
          ...prevData,
          locate: data.display_name,
        }));
        setConfirmAddress(true); // Показываем кнопку подтверждения адреса
      } else {
        setGeoError("Адрес не найден.");
        setShowModal(true); // Показываем модальное окно
      }
    } catch (error) {
      setGeoError("Ошибка при получении адреса: " + error.message);
      setShowModal(true); // Показываем модальное окно
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAddress = () => {
    if (!address) {
      setAddressError(true);
      setGeoError(
        "Адрес не найден. Пожалуйста, включите геолокацию или введите адрес вручную."
      );
      setShowModal(true);
    } else {
      setConfirmAddress(false);
      setAddressError(false);
    }
  };

  const handleAddressError = () => {
    setGeoError(
      "Адрес неправильный? Пожалуйста, включите геолокацию в настройках вашего браузера или устройства и повторите попытку."
    );
    setShowModal(true);
  };

  return (
    <div className="hero">
      <div className="container">
        <div className="hero_content">
          <div className="hero_textContent">
            <h1 className="hero_title">
              ВЫКУПИМ ВАШ АВТОМОБИЛЬ В ЛЮБОМ СОСТОЯНИИ В БИШКЕКЕ
            </h1>
            <p className="hero_pretitle">
              Нам уже доверились более 500 человек. Приедем, осмотрим и купим
              ваше авто из любой точки Кыргызстана!
            </p>
            <a href="tel:0709713875" className="hero_callBtn">
              ЗВОНИТЕ: (0709) 71-38-75
            </a>
          </div>
          <div className="hero_form">
            <p className="hero_form_text">Оцените автомобиль:</p>
            <form className="form" action="#">
              <input
                placeholder="Ваше имя"
                type="text"
                className="name"
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    username: e.target.value,
                  }))
                }
              />
              <input
                placeholder="Ваш номер телефона"
                type="text"
                className="number"
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    phone_number: e.target.value,
                  }))
                }
              />
              <input
                placeholder={loading ? "Загрузка..." : "Нажмите для заполнения"}
                value={address}
                type="text"
                className={`location ${addressError ? "error" : ""}`} // Добавляем класс ошибки
                onClick={autoLocation}
                readOnly
              />
              {confirmAddress && (
                <div>
                  <button
                    type="button"
                    className="confirm-address"
                    onClick={handleConfirmAddress}
                  >
                    Подтвердить адрес
                  </button>
                  <button
                    type="button"
                    className="address-error"
                    onClick={handleAddressError}
                  >
                    Неправильно?
                  </button>
                </div>
              )}
              <button
                type="button"
                className="send"
                onClick={send}
                disabled={!address}
              >
                ОТПРАВИТЬ
              </button>
            </form>
            <p className="info-adress">
              {address ? "Ваш адрес заполнен!" : "Адрес не указан!"}
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <p>{geoError}</p>
            <p>
              Пожалуйста, включите геолокацию в настройках вашего браузера или
              устройства и повторите попытку.
            </p>
            <p>
              Если адрес введен неверно, проверьте и введите правильный адрес
              вручную.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
