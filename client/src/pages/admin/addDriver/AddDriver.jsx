import React, { Fragment, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SidebarAdmin from "../../../components/SidebarAdmin";
import { useTranslation } from "react-i18next";
import axios from "axios";
import styles from "./styles.module.css";
import { BASE_URL } from "../../../api/api";

function AddDriver({ userData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [vehicleColor, setVehicleColor] = useState(null);
  const { t, i18n } = useTranslation();

  const driver = {
    username,
    phoneNumber,
    password,
    vehicle,
    vehicleNumber,
    vehicleColor,
  };
  const addDriver = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/driver/register`,
        driver
      );
      const notify = () => toast.success(data.message);
      notify();
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
        className="position-relative bg-gradient"
        style={{ height: "480px" }}
      >
        <div className="shape shape-bottom shape-slant bg-secondary d-none d-lg-block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 260">
            <polygon
              fill="currentColor"
              points="0,257 0,260 3000,260 3000,0"
            ></polygon>
          </svg>
        </div>
      </div>
      <div
        className="container position-relative zindex-5 pb-4 mb-md-3"
        style={{ marginTop: "-350px" }}
      >
        <div className="row">
          <SidebarAdmin userData={userData} />
          <div className="col-lg-8">
            <form onSubmit={addDriver}>
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
                  onChange={(e) => setUsername(e.target.value)}
                  value={username || ""}
                  minLength={3}
                />
              </div>
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
                <input
                  className={`form-control rounded ${styles.inputArabic}`}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("password")}
                  required
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
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
                  className={`fa-solid fa-car position-absolute top-50 ${
                    i18n.language === "en" ? "start-0" : "pe-3 end-0"
                  } translate-middle-y ms-3`}
                ></i>
                <input
                  className={`form-control rounded ${styles.inputArabic}`}
                  type="text"
                  placeholder={t("vehicleType")}
                  required
                  onChange={(e) => setVehicle(e.target.value)}
                  value={vehicle || ""}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded ${styles.inputArabic}`}
                  type="text"
                  placeholder={t("vehicleNumber")}
                  required
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  value={vehicleNumber || ""}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded ${styles.inputArabic}`}
                  type="text"
                  placeholder={t("vehicleColor")}
                  required
                  onChange={(e) => setVehicleColor(e.target.value)}
                  value={vehicleColor || ""}
                />
              </div>
              <button type="submit" className="btn btn-success float-end">
                {t("addDelegate")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddDriver;
