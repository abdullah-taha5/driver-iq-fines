import axios from "axios";
import React, { Fragment, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import SidebarAccount from "../components/SidebarAccount";
import { BASE_URL } from "../api/api";

function MyLocation({ userData }) {
  const { t, i18n } = useTranslation();
  const [phone, setPhone] = useState(userData.phone);

  const [fullAddress, setFullAddress] = useState(userData.fullAddress);
  const [floorNumber, setFloorNumber] = useState(userData.floorNumber);
  const [flatNumber, setFlatNumber] = useState(userData.flatNumber);
  const [note, setNote] = useState(userData.note);

  const createMyLocation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/users/profile/${userData.id}`,
        { phone, fullAddress, floorNumber, flatNumber, note },
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Updated Location Successfully");
      localStorage.removeItem("token");
      window.location.pathname = "/signin";
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Fragment>
      <div>
        <ToastContainer />
      </div>

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
          <div className="col-lg-8">
            <form onSubmit={createMyLocation}>
              <div className="input-group mb-3">
                <div className="input-group mb-3">
                  <input
                    className={`form-control rounded}`}
                    type="number"
                    placeholder={t("phoneNumber")}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone || ""}
                  />
                </div>
                <input
                  className={`form-control rounded}`}
                  type="text"
                  placeholder={t("fullAddress")}
                  required
                  onChange={(e) => setFullAddress(e.target.value)}
                  value={fullAddress || ""}
                  minLength={3}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="number"
                  placeholder={t("floorNumber")}
                  required
                  onChange={(e) => setFloorNumber(e.target.value)}
                  value={floorNumber || ""}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="number"
                  placeholder={t("flatNumber")}
                  required
                  onChange={(e) => setFlatNumber(e.target.value)}
                  value={flatNumber || ""}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="text"
                  placeholder={t("note")}
                  required
                  onChange={(e) => setNote(e.target.value)}
                  value={note || ""}
                />
              </div>

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

export default MyLocation;
