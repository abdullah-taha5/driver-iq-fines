import React, { Fragment, useState } from "react";
import axios from "axios";
import SidebarAccount from "../components/SidebarAccount";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../api/api";

function Profile({ userData }) {
  const [username, setUsername] = useState(userData.username);
  const [password, setPassword] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(userData.profilePhoto.url);
  const { t, i18n } = useTranslation();

  const profilePhotoUploadUser = async () => {
    const formNewProfilePhoto = new FormData();
    formNewProfilePhoto.append("image", profilePhoto);
    await axios.post(
      `${BASE_URL}/api/users/profile/profile-photo-upload`,
      formNewProfilePhoto,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  const saveNewProfileInfoUser = async (e) => {
    e.preventDefault();
    profilePhotoUploadUser();
    if (password) {
      await axios.put(
        `${BASE_URL}/api/users/profile/${userData.id}`,
        { username, password },
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        }
      );
    } else {
      await axios.put(
        `${BASE_URL}/api/users/profile/${userData.id}`,
        { username },
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        }
      );
    }

    localStorage.removeItem("token");
    window.location.pathname = "/signin";
  };
  const profilePhotoUploadDriver = async () => {
    const formNewProfilePhoto = new FormData();
    formNewProfilePhoto.append("image", profilePhoto);
    await axios.post(
      `${BASE_URL}/api/driver/profile/profile-photo-upload`,
      formNewProfilePhoto,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  const saveNewProfileInfoDriver = async (e) => {
    e.preventDefault();
    profilePhotoUploadDriver();
    if (password) {
      await axios.put(
        `${BASE_URL}/api/driver/profile/${userData.id}`,
        { username, password },
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        }
      );
    } else {
      await axios.put(
        `${BASE_URL}/api/driver/profile/${userData.id}`,
        { username },
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("token")}`,
          },
        }
      );
    }

    localStorage.removeItem("token");
    window.location.pathname = "/driver/signin";
  };

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
        className="container position-relative zindex-5 pb-4 mb-md-3"
        style={{ marginTop: "-350px" }}
      >
        <div className="row">
          <SidebarAccount userData={userData} />
          <form
            className="col-lg-8"
            onSubmit={
              userData.adminRole === false || userData.adminRole === true
                ? saveNewProfileInfoUser
                : saveNewProfileInfoDriver
            }
          >
            <div className="d-flex flex-column h-100 bg-light rounded-3 shadow-lg p-4">
              <div className="py-2 p-md-3">
                <div className="d-sm-flex align-items-center justify-content-between pb-4 text-center text-sm-start">
                  <h1 className="h3 mb-2 text-nowrap">{t("profileInfo")}</h1>
                </div>

                <div className="bg-secondary rounded-3 p-4 mb-4">
                  <div className="d-block d-sm-flex align-items-center">
                    <img
                      className="d-block rounded-circle mx-sm-0 mx-auto mb-3 mb-sm-0"
                      src={
                        userData.profilePhoto.url ===
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                          ? userData.profilePhoto.url
                          : `${BASE_URL}/${userData.profilePhoto.url}`
                      }
                      alt="Profile photo"
                      width="110"
                    />
                    <div className="ps-sm-3 text-center text-sm-start mx-2">
                      <input
                        type="file"
                        id="uploadImgProfile"
                        className="d-none"
                        onChange={(e) => setProfilePhoto(e.target.files[0])}
                      />
                      <label
                        className="btn btn-light shadow btn-sm mb-2"
                        htmlFor="uploadImgProfile"
                      >
                        <i className="fas fa-sync px-2"></i>
                        {t("changeProfilePicture")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3 pb-1">
                      <label
                        className="form-label px-0"
                        htmlFor="account-username"
                      >
                        {t("username")}
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input
                          className="form-control"
                          type="text"
                          id="account-username"
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3 pb-1">
                      <label
                        className="form-label px-0"
                        htmlFor="account-password"
                      >
                        {t("password")}
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="account-password"
                        placeholder="***********"
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                      />
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <hr className="mt-2 mb-4" />
                    <button
                      className="btn btn-primary mt-3 mt-sm-0 float-end"
                      type="submit"
                    >
                      <i className="far fa-save fs-lg px-2"></i>
                      {t("saveChanges")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
