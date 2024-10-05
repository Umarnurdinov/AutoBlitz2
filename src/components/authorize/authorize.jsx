import React, { useState, useRef, useEffect } from "react";
import "./authorize.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeNumber } from "../../store/slices/number";

const Authorize = () => {
  const [phone, setPhone] = useState("+996");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    phone: "+996",
    password: "",
  });
  const [userVer, setUserVer] = useState({
    phone: "",
    otp: "",
  });
  const [registrationStep, setRegistrationStep] = useState(false);
  const [verificationCodeField, setVerificationCodeField] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const [resetPasswordData, setResetPasswordData] = useState({
    phone: "",
    otp: "",
    new_password: "",
  });
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const prismRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = (token) => {
    axios
      .get("http://13.49.229.91:8000/user-info/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const postUser = (event) => {
    event.preventDefault();

    const userPayload = {
      phone: user.phone,
      password: user.password,
    };

    if (!userPayload.phone || userPayload.password.length < 8) {
      alert(
        "Пожалуйста, введите действительный номер телефона и пароль длиной не менее 8 символов."
      );
      return;
    }

    axios
      .post("http://13.49.229.91:8000/register/", userPayload)
      .then((res) => {
        if (res.data.message === "Код отправлен") {
          dispatch(storeNumber(user.phone));
          setUserVer({ ...userVer, phone: user.phone });
          setRegistrationStep(true);
          setVerificationCodeField(true);
        } else {
          alert("Неожиданный ответ от сервера.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Регистрация не удалась. Пожалуйста, попробуйте еще раз.");
      });
  };

  const verifyOtp = (event) => {
    event.preventDefault();

    if (!userVer.otp) {
      alert("Пожалуйста, введите OTP, отправленный на ваш телефон.");
      return;
    }

    axios
      .post("http://13.49.229.91:8000/verify-otp/", userVer)
      .then((res) => {
        const { token } = res.data;
        console.log("OTP verification successful, token:", token);
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        fetchUserInfo(token);
        nav("/");
      })
      .catch((err) => {
        console.error(err);
        alert("OTP verification failed. Пожалуйста, попробуйте еще раз.");
      });
  };

  const loginUser = (event) => {
    event.preventDefault();
    axios
      .post("http://13.49.229.91:8000/login/", { phone, password })
      .then((response) => {
        const { token } = response.data;
        console.log("Login successful, token:", token);
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        fetchUserInfo(token);
        nav("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Login failed. Пожалуйста, попробуйте еще раз.");
      });
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserInfo({});
    setActiveTab("login");
    prismRef.current.style.transform = "translateZ(-100px)";
    nav("/");
  };

  const showSignup = () => {
    setActiveTab("signup");
    prismRef.current.style.transform = "translateZ(-100px) rotateY(-90deg)";
  };

  const showLogin = () => {
    setActiveTab("login");
    prismRef.current.style.transform = "translateZ(-100px)";
  };

  const showForgotPassword = () => {
    setActiveTab("forgotPassword");
    prismRef.current.style.transform = "translateZ(-100px) rotateY(-180deg)";
  };

  const showThankYou = () => {
    setActiveTab("");
    prismRef.current.style.transform = "translateZ(-100px) rotateX(90deg)";
  };

  const resetPassword = (event) => {
    event.preventDefault();

    if (
      !resetPasswordData.phone ||
      !resetPasswordData.otp ||
      !resetPasswordData.new_password
    ) {
      alert(
        "Пожалуйста, введите все обязательные поля: номер телефона, OTP и новый пароль."
      );
      return;
    }

    axios
      .post("http://13.49.229.91:8000/reset-password/", resetPasswordData)
      .then((response) => {
        if (response.status === 200) {
          alert("Пароль успешно сброшен.");
          setIsPasswordReset(true);
          showLogin();
        } else {
          alert("Не удалось сбросить пароль. Пожалуйста, попробуйте еще раз.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Ошибка при сбросе пароля. Пожалуйста, попробуйте еще раз.");
      });
  };

  return (
    <div className="container">
      <div className="login-container">
        {!isAuthenticated ? (
          <>
            <ul className="nav">
              <li
                className={activeTab === "login" ? "active" : ""}
                onClick={showLogin}
              >
                Войти
              </li>
              <li
                className={activeTab === "signup" ? "active" : ""}
                onClick={showSignup}
              >
                Регистрация
              </li>
              <li
                className={activeTab === "forgotPassword" ? "active" : ""}
                onClick={showForgotPassword}
              >
                Забыли пароль
              </li>
            </ul>
            <div className="wrapper">
              <div className="rec-prism" ref={prismRef}>
                <div className="face face-front">
                  <div className="content">
                    <h2>Вход</h2>
                    <form onSubmit={loginUser}>
                      <div className="field-wrapper">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Номер телефона"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <label>Номер телефона</label>
                      </div>
                      <div className="field-wrapper">
                        <input
                          type="password"
                          name="password"
                          placeholder="Пароль"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Пароль</label>
                      </div>
                      <div className="field-wrapper">
                        <input type="submit" value="Войти" />
                      </div>
                      <span className="psw" onClick={showForgotPassword}>
                        Забыли пароль?
                      </span>
                    </form>
                  </div>
                </div>
                <div className="face face-back">
                  <div className="content">
                    <h2>Забыли пароль?</h2>
                    <small>
                      Введите свой номер телефона, чтобы мы могли отправить вам
                      код для сброса пароля
                    </small>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="field-wrapper">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Номер телефона"
                          value={resetPasswordData.phone}
                          onChange={(e) =>
                            setResetPasswordData({
                              ...resetPasswordData,
                              phone: e.target.value,
                            })
                          }
                        />
                        <label>Номер телефона</label>
                      </div>
                      <div className="field-wrapper">
                        <input
                          type="text"
                          name="otp"
                          placeholder="Код из SMS"
                          value={resetPasswordData.otp}
                          onChange={(e) =>
                            setResetPasswordData({
                              ...resetPasswordData,
                              otp: e.target.value,
                            })
                          }
                        />
                        <label>Код из SMS</label>
                      </div>
                      <div className="field-wrapper">
                        <input
                          type="password"
                          name="new_password"
                          placeholder="Новый пароль"
                          value={resetPasswordData.new_password}
                          onChange={(e) =>
                            setResetPasswordData({
                              ...resetPasswordData,
                              new_password: e.target.value,
                            })
                          }
                        />
                        <label>Новый пароль</label>
                      </div>
                      <div className="field-wrapper">
                        <input
                          type="submit"
                          value="Сбросить пароль"
                          onClick={resetPassword}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="face face-right">
                  <div className="content">
                    <h2>Регистрация</h2>
                    <form onSubmit={registrationStep ? verifyOtp : postUser}>
                      <div className="field-wrapper">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Номер телефона"
                          value={user.phone}
                          onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                          }
                        />
                        <label>Номер телефона</label>
                      </div>
                      <div className="field-wrapper">
                        <input
                          type="password"
                          name="password"
                          placeholder="Пароль"
                          autoComplete="new-password"
                          value={user.password}
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                        <label>Пароль</label>
                      </div>
                      {verificationCodeField && (
                        <div className="field-wrapper">
                          <input
                            type="text"
                            name="verificationCode"
                            placeholder="Код из SMS"
                            value={userVer.otp}
                            onChange={(e) =>
                              setUserVer({ ...userVer, otp: e.target.value })
                            }
                          />
                          <label>Код из SMS</label>
                        </div>
                      )}
                      <div className="field-wrapper">
                        <input
                          type="submit"
                          value={
                            registrationStep ? "Подтвердить код" : "Регистрация"
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="face face-top">
                  <div className="content">
                    <h2>Спасибо!</h2>
                    <button onClick={showLogin}>Вернуться ко входу</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="user-info">
            <h2>Добро пожаловать, {userInfo.name}</h2>
            <button onClick={logoutUser}>Выйти</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authorize;
