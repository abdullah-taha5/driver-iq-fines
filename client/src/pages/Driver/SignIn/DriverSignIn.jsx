import React, { Fragment, useState } from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../../api/api";

function DriverSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const { t, i18n } = useTranslation();

  const driver = {
    phoneNumber,
    password,
  };

  const driverSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/driver/login`,
        driver
      );
      localStorage.setItem("token", data.token);
      if (data.token) {
        window.location.pathname = "/";
      }
    } catch (error) {
      const notify = () => toast.error(error.response.data.message);
      notify();
    }
  };
  return (
    <Fragment>
      <div>
        <ToastContainer />
      </div>
      <section
        className="container d-flex justify-content-center align-items-center pt-7 pb-4"
        style={{ flex: "1 0 auto" }}
      >
        <div className={`signin-form mt-3 ${styles.signInForm}`}>
          <div className="signin-form-inner" style={{ marginTop: "80px" }}>
            <div className="view show" id="signin-view">
              <h1 className="h2 text-center mb-4">{t("delegateSignIn")}</h1>
              <form className="needs-validation" onSubmit={driverSignIn}>
                <div className="input-group mb-3">
                  <i
                    className={`fas fa-phone position-absolute top-50 ${
                      i18n.language === "en" ? "start-0" : "pe-3 end-0"
                    } translate-middle-y ms-3`}
                  ></i>
                  <input
                    className={`form-control rounded ${styles.inputArabic}`}
                    type="number"
                    placeholder={t("phoneNumber")}
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber || ""}
                  />
                </div>
                <div className="input-group mb-3">
                  <i
                    className={`fas fa-lock position-absolute top-50 translate-middle-y ms-3  ${
                      i18n.language === "en" ? "start-0" : "pe-3 end-0"
                    }`}
                  ></i>
                  <div className="password-toggle w-100">
                    <input
                      className={`form-control rounded ${styles.inputArabic}`}
                      type={showPassword ? "text" : "password"}
                      placeholder={t("password")}
                      required
                      minLength={8}
                      onChange={(e) => setPassword(e.target.value.trim())}
                      value={password || ""}
                    />
                    <i
                      className={`${
                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      } position-absolute top-50 translate-middle-y px-3  ${
                        i18n.language === "en" ? "end-0" : "start-0"
                      }`}
                      onClick={() => setShowPassword(!showPassword)}
                      role="button"
                    ></i>
                  </div>
                </div>
                <button className="btn btn-primary d-block w-100" type="submit">
                  {t("signIn")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default DriverSignIn;
