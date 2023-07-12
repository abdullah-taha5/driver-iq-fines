import React, { Fragment, useEffect, useState } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import axios from "axios";
import { BASE_URL } from "../../../api/api";
import moment from "moment";
import { useTranslation } from "react-i18next";
import loadingImg from "../../../images/loading.gif";

function NotificationsAdmin({ userData }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/notifications/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotifications(data);
      setLoading(true);
    };
    getNotifications();
  }, [notifications]);
  const deleteNotifications = async () => {
    await axios.delete(`${BASE_URL}/api/notifications/admin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  if (!loading) {
    return (
      <div className="container d-flex align-items-center justify-content-center mt-7">
        <img src={loadingImg} alt="loading" style={{ width: "200px" }} />
      </div>
    );
  }
  return (
    <Fragment>
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
          <div className="mt-5 col-lg-8" style={{ overflowX: "auto" }}>
            {notifications.length > 0 ? (
              notifications.map((item, i) => (
                <div className="alert alert-success" role="alert">
                  <span className="float-start text-dark">
                    {moment(item.createdAt).format("L")}
                  </span>
                  <span>{item.notification}</span>
                </div>
              ))
            ) : (
              <div className="text-center text-dark bg-light p-2 rounded">
                ليس لديك إشعارات
              </div>
            )}
            {notifications.length > 0 && (
              <button
                className="btn btn-danger float-end"
                onClick={deleteNotifications}
              >
                {t("delete")}
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NotificationsAdmin;
