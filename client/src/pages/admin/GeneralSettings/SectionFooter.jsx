import React, { Fragment, useState } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "../../../api/api";
import { toast, ToastContainer } from "react-toastify";

function SectionFooter({ userData }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [fax, setFax] = useState(null);
  const [address, setAddress] = useState(null);

  const footer = {
    email,
    phone,
    fax,
    address,
  };
  const changeSectionFooter = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/api/footer`, footer, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Successfully");

    window.location.pathname = "/";
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
            <form onSubmit={changeSectionFooter}>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="email"
                  placeholder={t("email")}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="number"
                  placeholder="رقم الهاتف"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="text"
                  placeholder="فاكس"
                  onChange={(e) => setFax(e.target.value)}
                  value={fax}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="text"
                  placeholder="العنوان"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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

export default SectionFooter;
