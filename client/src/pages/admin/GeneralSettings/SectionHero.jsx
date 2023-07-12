import React, { Fragment, useState } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "../../../api/api";

function SectionHero({ userData }) {
  const { t, i18n } = useTranslation();

  const [background, setBackground] = useState(null);
  const [h1, setH1] = useState(null);
  const [spanOne, setSpanOne] = useState(null);
  const [spanTwo, setSpanTwo] = useState(null);
  

  const changeSectionHero = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("background", background);
    formData.append("h1", h1);
    formData.append("spanOne", spanOne);
    formData.append("spanTwo", spanTwo);
   

    await axios.post(`${BASE_URL}/api/hero`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    window.location.pathname = "/";
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
          <SidebarAdmin userData={userData} />
          <div className="col-lg-8">
            <form onSubmit={changeSectionHero}>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="text"
                  placeholder={t("title")}
                  onChange={(e) => setH1(e.target.value)}
                  value={h1}
                  
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="text"
                  placeholder={t("text")}
                  onChange={(e) => setSpanOne(e.target.value)}
                  value={spanOne}
                  
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="text"
                  placeholder={t("text")}
                  onChange={(e) => setSpanTwo(e.target.value)}
                  value={spanTwo}
                  
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className={`form-control rounded}`}
                  type="file"
                  id="file-input"
                  onChange={(e) => setBackground(e.target.files[0])}
                  required
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

export default SectionHero;
