import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../api/api";
import SidebarAdmin from "../../components/SidebarAdmin";
import loadingImg from "../../images/loading.gif";

const ORDER_PER_PAGE = 10;

function OrdersByReceiptAdmin({ userData }) {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordersCount, setOrdersCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState(null);
  const selectRef = useRef(null);
  const pages = Math.ceil(ordersCount / ORDER_PER_PAGE);
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/order-pay-receipt?pageNumber=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const getDrivers = async () => {
        const { data } = await axios.get(`${BASE_URL}/api/driver/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDrivers(data);
      };
      getDrivers();
      setOrders(data);
      setLoading(true);
    };
    const getOrdersCount = async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/order-pay-receipt/count`
      );
      setOrdersCount(data);
    };
    getOrdersCount();
    getOrders();
  }, [orders]);
  const deleteOrder = async (id) => {
    const { data } = await axios.delete(
      `${BASE_URL}/api/order-pay-receipt/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success(data.message);
  };

  const updatePaymentStatus = async (id) => {
    await axios.put(
      `${BASE_URL}/api/order-pay-receipt/order/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const multiSelectAssignDelegate = async () => {
    const inputsCheckBox = document.querySelectorAll(
      "input[id=check-select-order]:checked"
    );
    const selectedUpdateOrders = [];

    for (let i = 0; i < inputsCheckBox.length; i++) {
      selectedUpdateOrders.push(inputsCheckBox[i].defaultValue);
    }

    if (driver) {
      await axios.put(
        `${BASE_URL}/api/order-pay-receipt`,
        {
          driver: selectRef.current.value,
          notification: `لديك طلبات جديده`,
          idsOrders: selectedUpdateOrders,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }
  };

  const multiSelectDeleteOrders = async () => {
    const inputsCheckBox = document.querySelectorAll(
      "input[id=check-select-order]:checked"
    );
    const selectedDeleteOrders = [];

    for (let i = 0; i < inputsCheckBox.length; i++) {
      selectedDeleteOrders.push(inputsCheckBox[i].defaultValue);
    }
    setShowCheckBox(true);
    setShowConfirmDelete(!showConfirmDelete);
    if (showConfirmDelete) {
      setShowCheckBox(false);

      const { data } = await axios.delete(
        `${BASE_URL}/api/order-pay-receipt`,
        { data: selectedDeleteOrders },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(data.message);
    }
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
      <ToastContainer />
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
          <SidebarAdmin userData={userData} />
          {orders.length > 0 ? (
            <div className="mt-5 col-lg-9" style={{ overflowX: "auto" }}>
              <div className="row">
                <div className="mb-3 col-sm">
                  <input
                    className="form-control"
                    type="text"
                    id="text-input"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder={t("searchByCustomer")}
                  />
                </div>
                <div className="mb-3 col-sm">
                  <select
                    className="bg-dark p-1 text-light mb-3"
                    id="select-input"
                    onChange={(e) => {
                      setDriver(e.target.value);
                      setShowCheckBox(true);
                    }}
                    value={driver || ""}
                    ref={selectRef}
                  >
                    <option disabled value={t("chooseDelegate")}>
                      {t("chooseDelegate")}
                    </option>
                    {drivers.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.username}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-dark mx-2"
                    onClick={multiSelectDeleteOrders}
                  >
                    {showConfirmDelete ? "تأكيد الحذف" : "حذف"}
                  </button>
                  {showCheckBox && (
                    <button
                      type="button"
                      className="btn btn-dark "
                      onClick={() => setShowCheckBox(false)}
                    >
                      إلغاء التحديد
                    </button>
                  )}
                </div>
              </div>

              <table className="table table-dark table-hover text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" className="text-center">
                      {t("order")}
                    </th>
                    <th scope="col">{t("receipt")}</th>
                    <th scope="col">{t("annual")}</th>
                    <th scope="col">{t("receiptNumber")}</th>
                    <th scope="col">{t("vehicleNumber")}</th>
                    <th scope="col">{t("fineDate")}</th>
                    <th scope="col">وقت المخالفة</th>
                    <th scope="col">{t("delegate")}</th>
                    <th scope="col">{t("delegateReceipt")}</th>
                    <th scope="col">{t("createdAt")}</th>
                    <th scope="col">{t("customer")}</th>
                    <th scope="col">{t("vehicleNumber")}</th>
                    <th scope="col">{t("phoneNumber")}</th>
                    <th scope="col">{t("fullAddress")}</th>
                    <th scope="col">{t("floorNumber")}</th>
                    <th scope="col">{t("flatNumber")}</th>
                    <th scope="col">{t("note")}</th>
                    <th scope="col">{t("paymentStatus")}</th>
                    <th scope="col">{t("amount")}</th>
                    <th scope="col">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .filter((item) =>
                      item.user.username.toLowerCase().trim().includes(search)
                    )
                    .map((order, i) => (
                      <tr key={i}>
                        <th>
                          {showCheckBox ? (
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="check-select-order"
                              value={order._id}
                              onChange={multiSelectAssignDelegate}
                            />
                          ) : (
                            <th scope="row">{i + 1}</th>
                          )}
                        </th>
                        <td>{order.orderId}</td>
                        <td>
                          <img
                            src={`${BASE_URL}/${order.fineReceipt}`}
                            width="100px"
                            height="100px"
                            alt=""
                            className="scale-img"
                          />
                        </td>
                        <td>
                          <img
                            src={`${BASE_URL}/${order.annual}`}
                            width="100px"
                            height="100px"
                            alt=""
                            className="scale-img"
                          />
                        </td>
                        <td>{order.receiptNumber}</td>
                        <td>{order.vehicleNumber}</td>
                        <td>
                          {order.dateFine
                            ? new Date(order.dateFine).toLocaleDateString()
                            : "_"}
                        </td>
                        <td>{order.timeFine ? order.timeFine : "_"}</td>
                        {order.driver ? (
                          <td>{order.driver.username}</td>
                        ) : (
                          <td>_</td>
                        )}
                        <td>
                          {order.driverReceipt ? (
                            <img
                              src={`${BASE_URL}/${order.driverReceipt}`}
                              width="100px"
                              height="100px"
                              alt=""
                              className="scale-img"
                            />
                          ) : (
                            "_"
                          )}
                        </td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>{order.user.username}</td>
                        {order.user.vehicleNumber ? (
                          <td>{order.user.vehicleNumber}</td>
                        ) : (
                          <td>_</td>
                        )}
                        {order.user.phone ? (
                          <td>{order.user.phone}</td>
                        ) : (
                          <td>_</td>
                        )}
                        {order.user.fullAddress ? (
                          <td>{order.user.fullAddress}</td>
                        ) : (
                          <td>_</td>
                        )}
                        {order.user.floorNumber ? (
                          <td>{order.user.floorNumber}</td>
                        ) : (
                          <td>_</td>
                        )}
                        {order.user.flatNumber ? (
                          <td>{order.user.flatNumber}</td>
                        ) : (
                          <td>_</td>
                        )}

                        {order.user.note ? (
                          <td>{order.user.note}</td>
                        ) : (
                          <td>_</td>
                        )}

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

                        <td className="dropdown">
                          <i
                            className="fas fa-cog"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            role="button"
                          ></i>
                          <div className="dropdown-menu dropdown-menu-end.my-1 text-center">
                            <span
                              className="dropdown-item"
                              role="button"
                              onClick={() => deleteOrder(order._id)}
                            >
                              {t("delete")}
                            </span>

                            <div className="dropdown-divider"></div>
                            {order.paymentStatus !== "success" && (
                              <Fragment>
                                <span
                                  className="dropdown-item"
                                  role="button"
                                  onClick={() => updatePaymentStatus(order._id)}
                                >
                                  مدفوع
                                </span>

                                <div className="dropdown-divider"></div>
                              </Fragment>
                            )}

                            <Link
                              to={`/orders-by-receipt/${order._id}`}
                              className="dropdown-item"
                            >
                              {t("viewOrder")}
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="d-md-flex justify-content-center align-items-center pt-3 pb-2">
                <nav className="mb-4" aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <button
                      className="page-item border-0"
                      onClick={() => setCurrentPage((current) => current - 1)}
                      disabled={currentPage === 1}
                    >
                      <i
                        className={`fas ${
                          i18n.language === "en"
                            ? "fa-chevron-left"
                            : "fa-chevron-right"
                        }`}
                      ></i>
                    </button>
                    {generatedPages.map((page) => (
                      <li
                        className={`${
                          currentPage === page
                            ? "page-item active"
                            : "page-item"
                        } d-none d-sm-block`}
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        role="button"
                      >
                        <span className="page-link">{page}</span>
                      </li>
                    ))}

                    <button
                      className="page-item border-0"
                      onClick={() => setCurrentPage((current) => current + 1)}
                      disabled={currentPage === pages}
                    >
                      <i
                        className={`fas ${
                          i18n.language === "en"
                            ? "fa-chevron-right"
                            : "fa-chevron-left"
                        }`}
                      ></i>
                    </button>
                  </ul>
                </nav>
              </div>
            </div>
          ) : (
            <div className="text-center text-dark bg-light p-2 rounded">
              لا يوجد طلبات بواسطة الإيصال
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default OrdersByReceiptAdmin;
