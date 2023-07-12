import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import logoIcon from "../../images/logo-icon.png";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";
import { BASE_URL } from "../../api/api";
import axios from "axios";

function Navbar({ userData }) {
  const [notifications, setNotifications] = useState([]);
  const { t, i18n } = useTranslation();
  const getNotifications = async () => {
    if (userData.adminRole || userData.adminRole == false) {
      const { data } = await axios.get(
        `${BASE_URL}/api/users/profile/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotifications(data.notificationsClient.reverse());
    } else if (!userData.adminRole) {
      const { data } = await axios.get(`${BASE_URL}/api/driver`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotifications(data.notificationsDriver);
    }
  };

  const deleteNotifications = async () => {
    if (userData.adminRole || userData.adminRole == false) {
      await axios.delete(`${BASE_URL}/api/notifications/client`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } else if (!userData.adminRole) {
      await axios.delete(`${BASE_URL}/api/notifications/driver`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  };

  const seenNotifications = async () => {
    if (userData.adminRole || userData.adminRole == false) {
      await axios.put(
        `${BASE_URL}/api/notifications/client`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } else if (!userData.adminRole) {
      await axios.put(
        `${BASE_URL}/api/notifications/driver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }
  };
  useEffect(() => {
    getNotifications();
  }, [notifications]);
  const changeLang = () => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("lang", i18n.language);
  };
  changeLang();

  return (
    <div className={`container px-0 px-xl-3 ${styles.navArabic}`}>
      <button
        className="navbar-toggler ms-n2 me-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#primaryMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <NavLink
        className="navbar-brand flex-shrink-0 order-lg-1 mx-auto ms-lg-0 pe-lg-2 me-lg-4"
        to="/"
      >
        <img
          className="d-none d-lg-block"
          width="153"
          src={logo}
          alt="Around"
        />
        <img className="d-lg-none" width="58" src={logoIcon} alt="Around" />
      </NavLink>

      <div className="d-flex align-items-center order-lg-3 ms-lg-auto">
        {userData ? (
          <div className="navbar-tool">
            <NavLink className="navbar-tool-icon-box" to="/profile">
              <img
                className="navbar-tool-icon-box-img"
                src={
                  userData.profilePhoto.url ===
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                    ? userData.profilePhoto.url
                    : `${BASE_URL}/${userData.profilePhoto.url}`
                }
                alt={userData.username}
              />
            </NavLink>
            <NavLink className="navbar-tool-label" to="/profile">
              <small>{t("hello")}</small>
              {userData.username}
            </NavLink>
          </div>
        ) : (
          <Fragment>
            <NavLink className="nav-link-style fs-sm text-nowrap" to="/signin">
              <i className="far fa-user fs-xl mx-2 align-middle"></i>
              {t("signIn")}
            </NavLink>
            <NavLink
              className={`btn btn-primary ms-grid-gutter d-none d-lg-inline-block ${styles.btnSignIn}`}
              to="/signup"
            >
              {t("signUp")}
            </NavLink>
          </Fragment>
        )}
      </div>

      <div
        className={`offcanvas offcanvas-collapse order-lg-2`}
        id="primaryMenu"
        style={{ visibility: "hidden" }}
        aria-hidden="true"
      >
        <div
          className={`offcanvas-header navbar-shadow ${styles.navMenuHeaderArabic}`}
        >
          <h5 className="mt-1 mb-0">{t("menu")}</h5>
          <button
            className="btn-close lead"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {t("home")}
              </NavLink>
            </li>
            {userData ? (
              userData.adminRole === false || userData.adminRole === true ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/order-pay-receipt">
                    {t("payTheFineByReceipt")}
                  </NavLink>
                </li>
              ) : (
                false
              )
            ) : (
              false
            )}
            {userData && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {t("viewProfile")}
                  </NavLink>
                </li>
                {userData.adminRole && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin-dashboard">
                      {t("adminDashboard")}
                    </NavLink>
                  </li>
                )}
              </>
            )}

            {userData && !userData.adminRole && (
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-muted rounded-pill position-relative"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onMouseEnter={seenNotifications}
                  >
                    <i className="fas fa-bell text-primary"></i>
                    {notifications.length > 0 &&
                      notifications.filter(
                        (notification) => notification.view === 0
                      ).length !== 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {
                            notifications.filter(
                              (notification) => notification.view === 0
                            ).length
                          }
                        </span>
                      )}
                  </button>

                  <ul
                    className="dropdown-menu pb-0 overflow-auto"
                    aria-labelledby="dropdownMenuButton1"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    {notifications.length > 0 ? (
                      <Fragment>
                        {notifications.map((item, i) => (
                          <li key={i} className="dropdown-item mb-2 text-center">
                            {item.notification}
                          </li>
                        ))}
                        <li
                          className="bg-danger text-light text-center w-100 py-1"
                          role="button"
                          onClick={deleteNotifications}
                        >
                          {t("delete")}
                        </li>
                      </Fragment>
                    ) : (
                      <li className="dropdown-item mb-2 p-2 text-center">
                        {t("thereAreNoNotifications")}
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
