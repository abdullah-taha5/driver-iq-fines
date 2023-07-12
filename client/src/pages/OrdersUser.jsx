import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import SidebarAccount from "../components/SidebarAccount";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../api/api";
import loadingImg from "../images/loading.gif";

function OrdersUser({ userData }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const searchToken = useLocation().search;
  const token = new URLSearchParams(searchToken);

  useEffect(() => {
    const getOrder = async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/users/profile/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrders(data.orders);
      setLoading(true);
    };

    getOrder();
  }, [orders]);
  const payOrder = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/api/orders/pay/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    window.open(data.urlPay);
  };

  if (token.get("token")) {
    const paymentStatus = async () => {
      const { data } = await axios.put(
        `${BASE_URL}/api/orders/pay/status?token=${token.get("token")}`
      );
    };
    paymentStatus();
  }
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
        className="container-fluid position-relative zindex-5 pb-4 mb-md-3"
        style={{ marginTop: "-350px" }}
      >
        <div className="row">
          <SidebarAccount userData={userData} />
          {orders.length > 0 ? (
            <div className="mt-5 col-lg-9" style={{ overflowX: "auto" }}>
              <table className="table table-dark table-hover text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" className="text-center">
                      {t("order")}
                    </th>
                    <th scope="col">{t("date")}</th>
                    <th scope="col">{t("delegate")}</th>
                    <th scope="col">{t("orderStatus")}</th>
                    <th scope="col">{t("paymentStatus")}</th>
                    <th scope="col">{t("amount")}</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{order.orderId}</td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      <td>
                        {order?.driver?.username
                          ? order?.driver?.username
                          : "_"}
                      </td>
                      <td>{order.orderStatus}</td>

                      <td
                        className={`${
                          order.paymentStatus === "success"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {order.paymentStatus === "success"
                          ? t("paid")
                          : t("unPaid")}
                      </td>
                      <td>{order.amount}</td>
                      <td>
                        {order.paymentStatus !== "success" ? (
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => payOrder(order._id)}
                          >
                            {t("pay")}
                          </button>
                        ) : (
                          <Link
                            role="button"
                            className="text-info"
                            to={`/order/invoice/${order._id}`}
                          >
                            <i className="fas fa-print"></i> {t("invoicePrint")}
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-dark bg-light p-2 rounded">
              لا يوجد طلبات لديك
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default OrdersUser;
