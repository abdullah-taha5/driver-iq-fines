import React, { Fragment, useEffect, useState } from "react";
import SidebarAccount from "../../../components/SidebarAccount";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../api/api";
import loadingImg from "../../../images/loading.gif";

function OrdersDriver({ userData }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [idOrder, setIdOrder] = useState(null);
  const [username, setUsername] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [note, setNote] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [commission, setCommission] = useState(null);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [search, setSearch] = useState("");

  const { t, i18n } = useTranslation();

  const getCommission = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/commission`);
    setCommission(data.commission);
  };
  useEffect(() => {
    const getOrder = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/driver`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(data.orders.reverse());
      setLoading(true);
    };
    getOrder();
    getCommission();
  }, [orders]);

  const updatePaymentStatus = async (id, status) => {
    await axios.put(
      `${BASE_URL}/api/orders/order/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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
        `${BASE_URL}/api/orders`,
        { data: selectedDeleteOrders },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }
  };
  const sendData = (
    id,
    username,
    vehicleNumber,
    fullAddress,
    floorNumber,
    flatNumber,
    note,
    idOrder,
    amount
  ) => {
    setId(id);
    setUsername(username);
    setVehicleNumber(vehicleNumber);
    setFullAddress(fullAddress);
    setFloorNumber(floorNumber);
    setFlatNumber(flatNumber);
    setNote(note);
    setIdOrder(idOrder);
    setAmount(amount);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `${BASE_URL}/api/users/profile/${id}`,
      {
        username,
        vehicleNumber,
        fullAddress,
        floorNumber,
        flatNumber,
        note,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const updateAmount = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `${BASE_URL}/api/orders/order/update/${idOrder}`,
      {
        amount: +amount + +amount / commission,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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
        className="container-fluid position-relative zindex-5 pb-4 mb-md-3"
        style={{ marginTop: "-350px" }}
      >
        <div className="row">
          <SidebarAccount userData={userData} />
          {orders.length > 0 ? (
            <div className="mt-5 col-lg-9" style={{ overflowX: "auto" }}>
              <div className="d-flex justify-content-around">
                <div className="mb-3 col-lg-6">
                  <input
                    className="form-control"
                    type="text"
                    id="text-input"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder={t("searchByCustomer")}
                  />
                </div>
                <div className="mb-3 ">
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
                      className="btn btn-dark"
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
                    <th scope="col">{t("date")}</th>
                    <th scope="col">{t("customer")}</th>
                    <th scope="col">{t("vehicleNumber")}</th>
                    <th scope="col">{t("fullAddress")}</th>
                    <th scope="col">{t("floorNumber")}</th>
                    <th scope="col">{t("flatNumber")}</th>
                    <th scope="col">{t("note")}</th>
                    <th scope="col">{t("paymentStatus")}</th>
                    <th scope="col">{t("amount")}</th>
                    <th colSpan="2">أجراءات</th>
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
                            />
                          ) : (
                            <th scope="row">{i + 1}</th>
                          )}
                        </th>
                        <td>{order.orderId}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>{order.user.username}</td>
                        <td>
                          {order.user.vehicleNumber
                            ? order.user.vehicleNumber
                            : "_"}
                        </td>
                        <td>
                          {order.user.fullAddress
                            ? order.user.fullAddress
                            : "_"}
                        </td>
                        <td>
                          {order.user.floorNumber
                            ? order.user.floorNumber
                            : "_"}
                        </td>
                        <td>
                          {order.user.flatNumber ? order.user.flatNumber : "_"}
                        </td>
                        <td>{order.user.note ? order.user.note : "_"}</td>
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
                          {order.paymentStatus === "success" ? (
                            <span
                              className="btn-danger shadow btn"
                              role="button"
                              onClick={() =>
                                updatePaymentStatus(order._id, "failed")
                              }
                            >
                              إلغاء الدفع
                            </span>
                          ) : (
                            <span
                              className="btn-success shadow btn"
                              role="button"
                              onClick={() =>
                                updatePaymentStatus(order._id, "success")
                              }
                            >
                              المبلغ مدفوع
                            </span>
                          )}
                        </td>
                        <td>
                          <span
                            className="btn-primary shadow btn-sm"
                            role="button"
                            data-bs-toggle="modal"
                            data-bs-target="#updateOrder"
                            onClick={() =>
                              sendData(
                                order.user._id,
                                order.user.username,
                                order.user.vehicleNumber,
                                order.user.fullAddress,
                                order.user.floorNumber,
                                order.user.flatNumber,
                                order.user.note,
                                order._id,
                                order.amount
                              )
                            }
                          >
                            <i className="fas fa-edit"></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-dark bg-light p-2 rounded">
              ليس لديك طلبات
            </div>
          )}
        </div>
      </div>
      <div
        class="modal fade"
        id="updateOrder"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-center" id="exampleModalLabel">
                تعديل علي البيانات و مبلغ العميل
              </h5>
            </div>
            <div class="modal-body">
              <form onSubmit={(e) => updateUser(e)}>
                <div class="mb-3">
                  <label for="normal-input" class="form-label">
                    اسم العميل
                  </label>
                  <input
                    class="form-control"
                    type="text"
                    id="normal-input"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>

                <div class="mb-3">
                  <label for="normal-input" class="form-label">
                    رقم المركبة
                  </label>
                  <input
                    class="form-control"
                    type="number"
                    id="normal-input"
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    value={vehicleNumber}
                  />
                </div>
                <div class="mb-3">
                  <label for="normal-input" class="form-label">
                    العنوان الكامل
                  </label>
                  <input
                    class="form-control"
                    type="text"
                    id="normal-input"
                    onChange={(e) => setFullAddress(e.target.value)}
                    value={fullAddress}
                  />
                </div>
                <div class="mb-3">
                  <label for="normal-input" class="form-label">
                    رقم الدور
                  </label>
                  <input
                    class="form-control"
                    type="number"
                    id="normal-input"
                    onChange={(e) => setFloorNumber(e.target.value)}
                    value={floorNumber}
                  />
                </div>
                <div class="mb-3">
                  <label for="normal-input" class="form-label">
                    رقم الشقة
                  </label>
                  <input
                    class="form-control"
                    type="number"
                    id="normal-input"
                    onChange={(e) => setFlatNumber(e.target.value)}
                    value={flatNumber}
                  />
                </div>
                <div class="mb-3">
                  <label for="normal-input" class="form-label">
                    ملحوظة
                  </label>
                  <input
                    class="form-control"
                    type="text"
                    id="normal-input"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    حفظ
                  </button>
                </div>
              </form>
              <form onSubmit={(e) => updateAmount(e)}>
                <div class="mb-3">
                  <label for="normal-input" class="form-label">
                    التعديل علي المبلغ :
                  </label>
                  <input
                    class="form-control"
                    type="number"
                    id="normal-input"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    required
                  />
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    حفظ
                  </button>
                </div>
              </form>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default OrdersDriver;
