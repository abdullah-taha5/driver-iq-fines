import React, { Fragment, useEffect, useState } from "react";
import SidebarAccount from "../../../components/SidebarAccount";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../api/api";
import moment from "moment";

function Notifications({ userData }) {
  const [notifications, setNotifications] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/driver`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotifications(data.notifications);

    };
    getNotifications();
  }, [notifications]);
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
          <SidebarAccount userData={userData} />
          <div className="mt-5 col-lg-8" style={{ overflowX: "auto" }}>
            {notifications.map((item, i) => (
              <div className="alert alert-success" role="alert" key={i}>
                <span>{item.notification}</span>
                <span className="float-end text-dark">
                  {moment(item.createdAt).fromNow()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Notifications;
