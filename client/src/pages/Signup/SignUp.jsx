import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import bgSignIn from "../../images/signin-img.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../api/api";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);

  const { t, i18n } = useTranslation();

  const user = {
    username,
    phoneNumber,
    password,
    vehicleNumber,
    adminRole: false,
  };
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/auth/register`,
        user
      );
      const notify = () => toast.success(data.message);
      notify();
      window.location.pathname = "/signin";
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
      <div
        className={`d-none d-md-block position-absolute w-50 h-100 bg-size-cover top-0 ${
          i18n.language === "en" ? "end-0" : "start-0"
        }`}
        style={{ backgroundImage: `url(${bgSignIn})` }}
      ></div>
      <section
        className={`container d-flex align-items-center pt-7 pb-3 pb-md-4 ${styles.formArabic}`}
        style={{ flex: "1 0 auto" }}
      >
        <div className="w-100 pt-3">
          <div className="row">
            <div className="col-lg-4 col-md-6 offset-lg-1">
              <div className="view show" id="signin-view">
                <h1 className="h2">{t("signUp")}</h1>
                <p className="fs-ms text-muted mb-4">{t("descSignUp")}</p>
                <form className="needs-validation" onSubmit={createUser}>
                  <div className="input-group mb-3">
                    <i
                      className={`far fa-user position-absolute top-50 translate-middle-y ms-3 ${
                        i18n.language === "en" ? "start-0" : "pe-3 end-0"
                      }`}
                    ></i>
                    <input
                      className={`form-control rounded ${styles.inputArabic}`}
                      type="text"
                      placeholder={t("username")}
                      required
                      onChange={(e) => setUsername(e.target.value.trim())}
                      value={username || ""}
                      minLength={3}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <i
                      className={`fas fa-phone-alt position-absolute top-50 ${
                        i18n.language === "en" ? "start-0" : "pe-3 end-0"
                      } translate-middle-y ms-3`}
                    ></i>
                    <input
                      className={`form-control rounded ${styles.inputArabic}`}
                      type="number"
                      placeholder={t("phoneNumber")}
                      required
                      onChange={(e) => setPhoneNumber(e.target.value.trim())}
                      value={phoneNumber || ""}
                      minLength={5}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <i
                      className={`fas fa-lock position-absolute top-50 translate-middle-y ms-3  ${
                        i18n.language === "en" ? "start-0" : "pe-3 end-0"
                      }`}
                    ></i>
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
                  <div className="input-group mb-3">
                  <i
                    className={`fas fa-car position-absolute top-50 ${
                      i18n.language === "en" ? "start-0" : "pe-3 end-0"
                    } translate-middle-y ms-3`}
                  ></i>
                  <input
                    className={`form-control rounded ${styles.inputArabic}`}
                    type="number"
                    placeholder="رقم المركبة ( أختياري )"
                    onChange={(e) => setVehicleNumber(e.target.value.trim())}
                    value={vehicleNumber || ""}
                  />
                </div>
                  <button
                    className="btn btn-primary d-block w-100"
                    type="submit"
                  >
                    {t("signUp")}
                  </button>
                  <p className="fs-sm pt-3 mb-0">
                    {t("alreadyHaveAnAccount")} {""}
                    <Link
                      to="/signin"
                      className="fw-medium"
                      data-view="#signup-view"
                    >
                      {t("signIn")}
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default SignUp;
