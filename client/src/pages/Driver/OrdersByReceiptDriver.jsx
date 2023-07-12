import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../api/api";
import SidebarAccount from "../../components/SidebarAccount";
import loadingImg from "../../images/loading.gif";

function OrdersByReceiptDriver({ userData }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState("");
  const [note, setNote] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [amount, setAmount] = useState(null);
  const [receiptNumber, setReceiptNumber] = useState(null);
  const [fineReceipt, setFineReceipt] = useState(null);
  const [commission, setCommission] = useState(0);
  const [commissionOne, setCommissionOne] = useState(0);
  const [commissionTwo, setCommissionTwo] = useState(0);
  const [commissionThree, setCommissionThree] = useState(0);
  const [commissionFour, setCommissionFour] = useState(0);
  const [commissionFive, setCommissionFive] = useState(0);
  const [annual, setAnnual] = useState(null);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [newReceipt, setNewReceipt] = useState(null);
  const { t, i18n } = useTranslation();

  const getCommission = async (e) => {
    setAmount(e.target.value);

    const { data } = await axios.get(
      `${BASE_URL}/api/commission/receipts/${e.target.value}`
    );
    setCommission(data.commission);
  };
  useEffect(() => {
    const getOrder = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/driver`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(data.ordersByReceipts.reverse());
      setLoading(true);
    };
    getOrder();
    const getCommissions = async (e) => {
      const { data } = await axios.get(
        `${BASE_URL}/api/commission/receipts-update`
      );
      const priceOne = data.filter((item) => item.price === 25000);
      setCommissionOne(priceOne[priceOne.length - 1].commission + 25000);

      const priceTwo = data.filter((item) => item.price === 50000);
      setCommissionTwo(priceTwo[priceTwo.length - 1].commission + 50000);

      const priceThree = data.filter((item) => item.price === 100000);
      setCommissionThree(priceThree[priceThree.length - 1].commission + 100000);

      const priceFour = data.filter((item) => item.price === 200000);
      setCommissionFour(priceFour[priceFour.length - 1].commission + 200000);

      const priceFive = data.filter((item) => item.price === 400000);
      setCommissionFive(priceFive[priceFive.length - 1].commission + 400000);
    };
    getCommissions();
  }, [orders]);

  const uploadNewReceipt = async (id, orderId, user) => {
    const formData = new FormData();
    formData.append("image", newReceipt);
    formData.append(
      "notification",
      `ارسل لك المندوب ايصال جديد, الطلب رقم #${orderId}`
    );
    formData.append("user", user);
    await axios.put(
      `${BASE_URL}/api/order-pay-receipt/driver-receipt/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  const updatePaymentStatus = async (id, status) => {
    await axios.put(
      `${BASE_URL}/api/order-pay-receipt/order/${id}`,
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
        `${BASE_URL}/api/order-pay-receipt`,
        { data: selectedDeleteOrders },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }
  };

  const sendDataUser = (
    id,
    fullAddress,
    username,
    floorNumber,
    flatNumber,
    note
  ) => {
    setId(id);
    setUsername(username);
    setFullAddress(fullAddress);
    setFloorNumber(floorNumber);
    setFlatNumber(flatNumber);
    setNote(note);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `${BASE_URL}/api/users/profile/${id}`,
      {
        username,
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

  const sendDataOrder = (id, vehicleNumber, receiptNumber, orderAmount) => {
    setId(id);
    setVehicleNumber(vehicleNumber);
    setReceiptNumber(receiptNumber);
    setAmount(orderAmount.toString());
  };
  const updateOrder = async (e) => {
    e.preventDefault();

    const { data } = await axios.put(
      `${BASE_URL}/api/order-pay-receipt/update/${id}`,
      {
        vehicleNumber,
        receiptNumber,
        amount: +amount,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  const updateFineReceipt = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("receipt", fineReceipt);
    const { data } = await axios.put(
      `${BASE_URL}/api/order-pay-receipt/fine-receipt/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  const updateAnnual = async (e) => {
    const formData = new FormData();
    formData.append("annual", annual);
    const { data } = await axios.put(
      `${BASE_URL}/api/order-pay-receipt/annual/${id}`,
      formData,
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
                    <th scope="col">{t("receipt")}</th>
                    <th scope="col">{t("annual")}</th>
                    <th scope="col">{t("receiptNumber")}</th>
                    <th scope="col">{t("vehicleNumber")}</th>
                    <th scope="col">{t("fineDate")}</th>
                    <th scope="col">وقت المخالفة</th>
                    <th scope="col">{t("delegateReceipt")}</th>
                    <th scope="col">{t("createdAt")}</th>
                    <th scope="col">{t("customer")}</th>
                    <th scope="col">{t("fullAddress")}</th>
                    <th scope="col">{t("floorNumber")}</th>
                    <th scope="col">{t("flatNumber")}</th>
                    <th scope="col">{t("note")}</th>
                    <th scope="col">{t("paymentStatus")}</th>
                    <th scope="col">{t("amount")}</th>
                    <th colSpan="5">أجراءات</th>
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
                          <input
                            type="file"
                            id="uploadImgProfile"
                            className="d-none"
                            onChange={(e) => setNewReceipt(e.target.files[0])}
                          />
                          <label
                            className="btn-primary shadow btn-sm"
                            htmlFor="uploadImgProfile"
                            role="button"
                          >
                            صورة الايصال
                          </label>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="btn-sm btn text-light"
                            onClick={() =>
                              uploadNewReceipt(
                                order._id,
                                order.orderId,
                                order.user._id
                              )
                            }
                          >
                            <i className="fas fa-upload"></i>
                          </button>
                        </td>

                        <td>
                          <span
                            className="btn-primary shadow btn"
                            role="button"
                            data-bs-toggle="modal"
                            data-bs-target="#updateUser"
                            onClick={() =>
                              sendDataUser(
                                order.user._id,
                                order.user.username,
                                order.user.fullAddress,
                                order.user.floorNumber,
                                order.user.flatNumber,
                                order.user.note
                              )
                            }
                          >
                            بيانات العميل
                          </span>
                        </td>
                        <td>
                          <span
                            className="btn-primary shadow btn"
                            role="button"
                            data-bs-toggle="modal"
                            data-bs-target="#updateOrder"
                            onClick={() =>
                              sendDataOrder(
                                order._id,
                                order.vehicleNumber,
                                order.receiptNumber,
                                order.amount
                              )
                            }
                          >
                            تعديل الطلب
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-dark bg-light p-2 rounded">
              لا يوجد طلبات لديك بواسطة الإيصال
            </div>
          )}
        </div>
      </div>
      <div
        className="modal fade"
        id="updateUser"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                تعديل علي بيانات العميل
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => updateUser(e)}>
                <div className="mb-3">
                  <label htmlFor="normal-input" className="form-label">
                    اسم العميل
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="normal-input"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="normal-input" className="form-label">
                    العنوان الكامل
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="normal-input"
                    onChange={(e) => setFullAddress(e.target.value)}
                    value={fullAddress}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="normal-input" className="form-label">
                    رقم الدور
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="normal-input"
                    onChange={(e) => setFloorNumber(e.target.value)}
                    value={floorNumber}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="normal-input" className="form-label">
                    رقم الشقة
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="normal-input"
                    onChange={(e) => setFlatNumber(e.target.value)}
                    value={flatNumber}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="normal-input" className="form-label">
                    ملحوظة
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="normal-input"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                  />
                </div>
                <div className="modal-footer float-start">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    إلغاء
                  </button>
                  <button type="submit" className="btn btn-primary">
                    حفظ التغييرات
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="updateOrder"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                تعديل علي الطلب
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => updateOrder(e)}>
                <div className="row">
                  <div className="mb-3 col-md-4">
                    <label htmlFor="normal-input" className="form-label">
                      {t("vehicleNumber")}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="normal-input"
                      placeholder={t("vehicleNumber")}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      value={vehicleNumber || ""}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="normal-input" className="form-label">
                      {t("receiptNumber")}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="normal-input"
                      placeholder={t("receiptNumber")}
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      value={receiptNumber || ""}
                    />
                  </div>

                  <div className="mb-3 col-md-4">
                    <label htmlFor="normal-input" className="form-label">
                      {t("selectPrice")}
                    </label>
                    <select
                      className="form-select"
                      id="select-input"
                      onChange={(e) => getCommission(e)}
                      value={+amount}
                      onSelect={amount}
                      required
                    >
                      <option value={commissionOne}>25000</option>
                      <option value={commissionTwo}>50000</option>
                      <option value={commissionThree}>100000</option>
                      <option value={commissionFour}>200000</option>
                      <option value={commissionFive}>400000</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    حفظ
                  </button>
                </div>
              </form>
              <form onSubmit={(e) => updateFineReceipt(e)}>
                <div className="mb-3">
                  <label htmlFor="file-input" className="form-label">
                    التعديل علي صورة إيصال العميل:
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="file-input"
                    onChange={(e) => setFineReceipt(e.target.files[0])}
                  />
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      حفظ
                    </button>
                  </div>
                </div>
              </form>
              <form onSubmit={(e) => updateAnnual(e)}>
                <div className="mb-3">
                  <label htmlFor="file-input" className="form-label">
                    التعديل علي صورة السنوية:
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="file-input"
                    onChange={(e) => setAnnual(e.target.files[0])}
                  />
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      حفظ
                    </button>
                  </div>
                </div>
              </form>

              <button
                type="button"
                className="btn btn-secondary"
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

export default OrdersByReceiptDriver;
