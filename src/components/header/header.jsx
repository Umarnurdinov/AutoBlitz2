import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logoAdd from "../../assets/logoAdd.webp";
import "./header.scss";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showModal]);

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header_content">
            <Link to={"/"}>
              <div className="header_logo">
                <img src={logo} alt="#" className="header_logo_img" />
                <div className="header_logo_textContent"></div>
              </div>
            </Link>
            <div className="header_nav">
              <div className="header_nav_add">
                <Link className="pluss" to="#" onClick={handleOpenModal}>
                  <FiPlusCircle className="plus" />
                  <p className="header_nav_add_text">Продать авто</p>
                </Link>
              </div>
              <div className="header_nav_like">
                <Link to={"/favorite"} className="likes">
                  <FaRegHeart className="like" />
                  <p className="header_nav_like_text">Избранное</p>
                </Link>
              </div>
              <div className="header_nav_signin">
                <Link className="signins" to={"/authorization"}>
                  <FaRegUser className="signin" />
                  <p className="header_nav_signin_text">Войти</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Как вы хотите продать авто?</h2>
            <div className="modal-body">
              <div className="tab-content">
                <ul className="ul">
                  <li className="li">
                    Нет ограничений по возрасту и пробегу автомобиля
                  </li>
                  <li className="li">
                    Вы сами определяете стоимость вашего автомобиля
                  </li>
                  <li className="li">Личная коммуникация с покупателями</li>
                </ul>
                <img className="icon" src={logoAdd} alt="#" />
                <Link to={"/form"}>
                  <button className="btn-create-final">
                    Создать объявление
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
