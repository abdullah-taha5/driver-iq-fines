import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../api/api';

function InvoiceOrderByReceipt() {
    const { t, i18n } = useTranslation();
    const [order, setOrder] = useState([]);
    const { id } = useParams();
  
    useEffect(() => {
      const getOrder = async () => {
        const { data } = await axios.get(
          `${BASE_URL}/api/order-pay-receipt/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrder(data);
      };
      getOrder();
    }, [order]);
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
      className="container position-relative zindex-5 p-5 mb-md-3 bg-light"
      style={{ marginTop: "-350px" }}
    >
      <div className="d-flex justify-content-between">
        <div>
          <h4 className="mb-4">Iraqi Traffic Police</h4>
          
        </div>
        <div>
          <h2>{t("invoice")}</h2>
        </div>
      </div>
      <table className="table table-success table-striped text-center">
        <thead>
          <tr>
            <th scope="col">{t("order")}</th>
            <th scope="col">{t("amount")}</th>
            <th scope="col">{t("paymentStatus")}</th>
            <th scope="col">رقم الإيصال</th>
            <th scope="col">رقم المركبة</th>
            <th scope="col">تاريخ المخالفة</th>
            <th scope="col">وقت المخالفة</th>
            <th scope="col">{t("createdAt")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{order.orderId}</th>
            <td>{order.amount}</td>
            <td
              className={`${
                order.paymentStatus === "success"
                ? "text-success"
                : "text-danger"
              }`}
            >
            {order.paymentStatus === "success" ? t("paid") : t("unPaid")}
            </td>
            <td>{order.receiptNumber}</td>
            <td>{order.vehicleNumber}</td>
            <td>{order.dateFine ? new Date(order.dateFine).toLocaleDateString() : "_"}</td>
            <td>{order.timeFine ? order.timeFine : "_"}</td>
            <td>{new Date(order.createdAt).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="row my-5">
        <div className="col-sm-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t("customerInfo")}</h5>
              <div className="d-flex meta-link fs-sm align-items-center pt-3">
                <img
                  className="rounded-circle"
                  src={
                    order?.user?.profilePhoto?.url ===
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                      ? order?.user?.profilePhoto?.url
                      : `${BASE_URL}/${order?.user?.profilePhoto?.url}`
                  }
                  alt={order?.user?.username}
                  width="36"
                />
                <div className="px-2 ms-1 mt-n1 text-dark">
                  <span className="fw-semibold ms-1">
                    {order?.user?.username}
                  </span>
                </div>
              </div>
              <p className="card-text my-3">
              {t("phoneNumber")}: {order?.user?.phoneNumber}
            </p>
            {order?.user?.fullAddress && (
              <p className="card-text my-3">
                {t("fullAddress")}: {order?.user?.fullAddress}
              </p>
            )}
            {order?.user?.floorNumber && (
              <p className="card-text my-3">
                {t("floorNumber")}: {order?.user?.floorNumber}
              </p>
            )}
          
            {order?.user?.flatNumber && (
              <p className="card-text my-3">
                {t("flatNumber")}: {order?.user?.flatNumber}
              </p>
            )}
            {order?.user?.note && (
              <p className="card-text my-3">
                {t("note")}: {order?.user?.note}
              </p>
            )}
             
            </div>
          </div>
        </div>
        {order?.driver !== null && (
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{t("delegate")}</h5>
                <div className="d-flex meta-link fs-sm align-items-center pt-3">
                  <img
                    className="rounded-circle"
                    src={
                      order?.driver?.profilePhoto?.url ===
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                        ? order?.driver?.profilePhoto?.url
                        : `${BASE_URL}/${order?.driver?.profilePhoto?.url}`
                    }
                    alt={order?.driver?.username}
                    width="36"
                  />
                  <div className="px-2 ms-1 mt-n1 text-dark">
                    <span className="fw-semibold ms-1">
                      {order?.driver?.username}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <p>
        {t("creationDate")}: {new Date().toLocaleDateString()}
      </p>
      <div className="btn-group" role="group" aria-label="Solid button group">
        <button
          type="button"
          className="btn btn-success btn-print"
          onClick={() => window.print()}
        >
          {t("print")}
        </button>
      </div>
    </div>
  </Fragment>
  )
}

export default InvoiceOrderByReceipt