import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import SidebarAdmin from "../../components/SidebarAdmin";
import { BASE_URL } from "../../api/api";
import loadingImg from "../../images/loading.gif";

function Users({ userData }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();

  const deleteUser = async (id) => {
    await axios.delete(`${BASE_URL}/api/driver/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  const setAdmin = async (id) => {
    const { data } = await axios.put(
      `${BASE_URL}/api/users/profile/${id}`,
      { adminRole: true },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  const setDefaultUser = async (id) => {
    const { data } = await axios.put(
      `${BASE_URL}/api/users/profile/${id}`,
      { adminRole: false },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(data);
      setLoading(true);
    };
    getUsers();
  }, [users]);

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
          <SidebarAdmin userData={userData} />
          <div className="mt-5 col-lg-9" style={{ overflowX: "auto" }}>
            <div className="mb-3 col-lg-6 mx-auto">
              <input
                className="form-control"
                type="text"
                id="text-input"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="البحث باسم المستخدم"
              />
            </div>
            <table className="table table-dark table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>

                  <th scope="col">{t("phoneNumber")}</th>
                  <th scope="col">{t("username")}</th>
                  <th scope="col">{t("vehicleNumber")}</th>
                  <th colspan="2">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((item) =>
                    item.username.toLowerCase().trim().includes(search)
                  )
                  .map((item, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>

                      <td>{item.phoneNumber}</td>
                      <td>{item.username}</td>
                      <td>{item.vehicleNumber ? item.vehicleNumber : "_"}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteUser(item._id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                      <td>
                        {item.adminRole ? (
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => setDefaultUser(item._id)}
                          >
                            Set Default User
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => setAdmin(item._id)}
                          >
                            Set Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Users;
