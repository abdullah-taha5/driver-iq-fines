import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../api/api";

function OrderPayByReceipt() {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [receiptNumber, setReceiptNumber] = useState(null);
  const [dateFine, setDateFine] = useState(null);
  const [timeFine, setTimeFine] = useState(null);
  const [imageReceipt, setImageReceipt] = useState(null);
  const [imageAnnual, setImageAnnual] = useState(null);
  const [commission, setCommission] = useState(null);
  const [term, setTerm] = useState(null);

  const getCommission = async (e) => {
    setAmount(e.target.value);
    const {data} = await axios.get(`${BASE_URL}/api/commission/receipts/${e.target.value}`);
    setCommission(data.commission);
    
     }
  
  useEffect(() => {
  
    const geTerm = async () => {
      const {data} = await axios.get(`${BASE_URL}/api/term`);
      setTerm(data.term);
       }
       geTerm();
  }, [commission, term])
  const createOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("amount", +amount + commission);
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("receiptNumber", receiptNumber);
    dateFine && formData.append("dateFine", dateFine);
    timeFine && formData.append("timeFine", timeFine);
    formData.append("images", imageReceipt);
    formData.append("images", imageAnnual);
    
    const createdOrder = await axios.post(
      `${BASE_URL}/api/order-pay-receipt`,

      formData,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { data } = await axios.get(
      `${BASE_URL}/api/order-pay-receipt/pay/${createdOrder.data._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    window.open(data.urlPay);
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <form
        className="w-75 mx-auto p-5 rounded"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        onSubmit={createOrder}
      >
        <div className="row">
          <div className="mb-3 col-md-3">
            <label for="normal-input" className="form-label">
              {t("vehicleNumber")}
            </label>
            <input
              className="form-control"
              type="text"
              id="normal-input"
              placeholder={t("vehicleNumber")}
              onChange={(e) => setVehicleNumber(e.target.value)}
              value={vehicleNumber}
              required
            />
          </div>
          <div className="mb-3 col-md-3">
            <label for="normal-input" className="form-label">
              {t("receiptNumber")}
            </label>
            <input
              className="form-control"
              type="text"
              id="normal-input"
              placeholder={t("receiptNumber")}
              onChange={(e) => setReceiptNumber(e.target.value)}
              value={receiptNumber}
              required
            />
          </div>
          <div className="mb-3 col-md-3">
            <label for="normal-input" className="form-label">
            {t("dateFine")} ( أختياري )
            </label>
            <input
              className="form-control"
              type="date"
              id="normal-input"
              onChange={(e) => setDateFine(e.target.value)}
              value={dateFine}
            />
          </div>
          <div className="mb-3 col-md-3">
          <label for="normal-input" className="form-label">
          وقت المخالفة ( أختياري )
          </label>
          <input
            className="form-control"
            type="time"
            id="normal-input"
            onChange={(e) => setTimeFine(e.target.value)}
            value={timeFine}
          />
        </div>
          <div className="mb-3 col-md-3">
            <label for="normal-input" className="form-label">
            {t("selectPrice")}
            </label>
            <select
              className="form-select"
              id="select-input"
              onChange={(e) => getCommission(e)}
              value={amount}
              required
            >
              <option selected disabled>
              {t("selectPrice")}
              </option>
              <option>25000</option>
              <option>50000</option>
              <option>100000</option>
              <option>200000</option>
              <option>400000</option>
            </select>
          </div>
        </div>

        <div className="file-drop-area mb-2">
          <div className="file-drop-icon">
            <i
              className={`fas ${imageReceipt ? "fa-check text-success" : "fa-cloud-upload"} `}
            ></i>
          </div>
          <span className="file-drop-message">
          {t("dragImages")}
          </span>
          <input
            type="file"
            className="file-drop-input"
            onChange={(e) => setImageReceipt(e.target.files[0])}
            required
          />
       
        </div>
        <div className="file-drop-area">
          <div className="file-drop-icon">
            <i
              className={`fas ${imageAnnual ? "fa-check text-success" : "fa-cloud-upload"} `}
            ></i>
          </div>
          <span className="file-drop-message">
            {t("dragImages")}
          </span>
          <input
            type="file"
            className="file-drop-input"
            onChange={(e) => setImageAnnual(e.target.files[0])}
            required
          />
        </div>
        <div className="my-4 p-3 border rounded text-primary">
        اضافة {commission} الى مبلغ الغرامة عمولة الموقع
      
      </div>
        <div className="my-4 p-3 border rounded text-primary">
          {term}
        </div>
        <div className="my-3 p-3 ">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="invalidCheck01"
              required
            />
            <label className="form-check-label " for="invalidCheck01">
              {t("agreeToTermsAndConditions")}
            </label>
            <div className="invalid-tooltip">You must agree before submitting.</div>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          {t("payNow")}
        </button>
      </form>
    </div>
  );
}

export default OrderPayByReceipt;
