import React, { Fragment, useEffect, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../api/api";
import loadingImg from "../../images/loading.gif";

function Drivers({ userData }) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getDrivers = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/driver/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDrivers(data);
      setLoading(true);
    };
    getDrivers();
  }, [drivers]);
  const deleteDriver = async (id) => {
    const { data } = await axios.delete(
      `${BASE_URL}/api/driver/profile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success(data.message);
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
        className="container-fluid position-relative zindex-5 pb-4 mb-md-3"
        style={{ marginTop: "-350px" }}
      >
        <div className="row">
          <SidebarAdmin userData={userData} />
          {drivers.length > 0 ? (
            <div
              className="mt-5 col-lg-9 text-center"
              style={{ overflowX: "auto" }}
            >
              <div className="mb-3 col-lg-6 mx-auto">
                <input
                  className="form-control"
                  type="text"
                  id="text-input"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="البحث بأسم المندوب"
                />
              </div>
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>

                    <th scope="col">{t("phoneNumber")}</th>
                    <th scope="col">اسم المندوب</th>
                    <th scope="col">{t("vehicleType")}</th>
                    <th scope="col">{t("vehicleColor")}</th>
                    <th scope="col">{t("vehicleNumber")}</th>
                    <th scope="col">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers
                    .filter((item) =>
                      item.username.toLowerCase().trim().includes(search)
                    )
                    .map((item, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>

                        <td>{item.phoneNumber}</td>
                        <td>{item.username}</td>
                        <td>{item.vehicle}</td>
                        <td>{item.vehicleColor}</td>
                        <td>{item.vehicleNumber}</td>

                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteDriver(item._id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-dark bg-light p-2 rounded">
              لا يوجد مندوبين
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Drivers;
