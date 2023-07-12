import React, { Fragment, useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import loaderImg from "../../images/loader0001.gif";
import { Link } from 'react-router-dom';

function CreateOrder({userData}) {
  const { t, i18n } = useTranslation();
  const [vehicleLetters, setVehicleLetters] = useState([]);
  const [vehicleLettersText, setVehicleLettersText] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehiclePlaces, setVehiclePlaces] = useState([]);
  const [vehicleNum, setVehicleNum] = useState(null);
  const inputVehicleLetterRef = useRef();
  const inputVehicleTypeRef = useRef();
  const inputVehiclePlaceRef = useRef();
  const [loading, setLoading] = useState(false);
  const [tbodyHtml, setTbodyHtml] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);
  const [commission, setCommission] = useState(null);

  const getvehiclesData = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/vehicles`);
    setVehicleLetters(data.vehicleLetters);
    setVehicleTypes(data.vehicleTypes);
    setVehiclePlaces(data.vehiclePlaces);
    setVehicleLettersText(data.vehicleLettersTextContent);
  };
  const getCommission = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/commission`);
    setCommission(data.commission);
  };
  useEffect(() => {
    getvehiclesData();

    getCommission();
  }, []);

  const searchOrder = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/orders/search/order`, {
        vehicleLetter: inputVehicleLetterRef.current.value,
        vehicleType: inputVehicleTypeRef.current.value,
        vehiclePlace: inputVehiclePlaceRef.current.value,
        vehicleNum,
      });
      setTbodyHtml(data.tbodyHtml);
      setTotal(+data.total + +data.total / commission);
    } catch (error) {
      setError(error.response.data.message);
    }

    setLoading(true);
  };
  const createOrder = async (e) => {
    e.preventDefault();
    const createdOrder = await axios.post(
      `${BASE_URL}/api/orders`,
      {
        total,
        notification: `طلب جديد`,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { data } = await axios.get(
      `${BASE_URL}/api/orders/pay/${createdOrder.data._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    window.open(data.urlPay);
  };

  const closeButton = () => {
    setLoading(false);
    setError(null);
    setTotal(null);
  };
  return (
    <Fragment>
      <ToastContainer />
      <form
        className="container position-relative zindex-5 bg-secondary border rounded-3 px-4 pt-4 pb-3 form-arabic"
        style={{ marginTop: "-68px" }}
        onSubmit={searchOrder}
      >
        <div className="row ">
          <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom01" className="form-label">
              {t("vehicleNumber")}:
            </label>
            <input
              className="form-control"
              type="text"
              id="validationCustom01"
              onChange={(e) => setVehicleNum(e.target.value)}
              value={vehicleNum}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom03" className="form-label">
              {t("vehicleLetter")}:
            </label>
            <select
              className="form-select"
              id="validationCustom03"
              ref={inputVehicleLetterRef}
              required
            >
              {vehicleLetters?.map((val, i) => (
                <option value={val} key={i}>
                  {vehicleLettersText[i]}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom03" className="form-label">
              {t("vehicleType")}:
            </label>
            <select
              className="form-select"
              id="validationCustom03"
              ref={inputVehicleTypeRef}
              required
            >
              {vehicleTypes?.map((val, i) => (
                <option value={val} key={i}>
                  {val}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationCustom03" className="form-label">
              {t("VehicleRegistrationPlace")}:
            </label>
            <select
              className="form-select"
              id="validationCustom03"
              ref={inputVehiclePlaceRef}
              required
            >
              {vehiclePlaces?.map((val, i) => (
                <option value={val} key={i}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary"
            type="submit"
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#vehicleData"
          >
            {t("search")}
          </button>
        </div>
      </form>
      {vehicleNum && (
        <div
          className="modal hide fade in"
          tabindex="-1"
          id="vehicleData"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {loading ? (
                  <div className="table-responsive">
                    {!error ? (
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <th>{t("violationNumber")}</th>
                            <th>{t("violationAmount")}</th>
                            <th>{t("thePlaceOfTheViolation")}</th>
                            <th>{t("date")}</th>
                          </tr>
                        </thead>
                        <tbody
                          dangerouslySetInnerHTML={{ __html: tbodyHtml }}
                        />
                      </table>
                    ) : (
                      <p className="text-center text-danger">{error}</p>
                    )}

                    {total && (
                      <p className="text-center my-4">
                        {t("total")}:{" "}
                        <span className="text-success">{total}</span>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <img
                      src={loaderImg}
                      alt="loader"
                      width="200"
                      height="200"
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                  onClick={closeButton}
                >
                  {t("close")}
                </button>
                {(!error && loading && userData ? userData.adminRole === false || userData.adminRole === true : false) && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={createOrder}
                  >
                    {t("payNow")}
                  </button>
                )}
                {(!error && loading && !userData) && (
                  <a
                    type="button"
                    className="btn btn-primary btn-sm"
                    
                    href="/signin"
                  >
                    {t("payNow")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default CreateOrder;
