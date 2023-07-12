import axios from "axios";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../../api/api";
import SidebarAdmin from "../../../components/SidebarAdmin";

function CommissionByReceipts({ userData }) {
  const { t, i18n } = useTranslation();

  const [commission, setCommission] = useState(null);
  const [price, setPrice] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${BASE_URL}/api/commission/receipts`,
      { commission, price },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Successfully");
    setCommission("");
    setPrice("");
  };

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
        className="container position-relative zindex-5 pb-4 mb-md-3"
        style={{ marginTop: "-350px" }}
      >
        <div className="row">
          <SidebarAdmin userData={userData} />
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <input
                className={`form-control w-75`}
                type="number"
                placeholder="دينار عراقي"
                onChange={(e) => setCommission(e.target.value)}
                value={commission}
                required
              />
              <select
                className="form-select my-3 w-75"
                id="select-input"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
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

              <button type="submit" className="btn btn-success float-end">
                {t("saveChanges")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CommissionByReceipts;
