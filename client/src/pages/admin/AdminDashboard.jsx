import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import SidebarAdmin from '../../components/SidebarAdmin';


function AdminDashboard({userData}) {
  const { t, i18n } = useTranslation();

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
        </div>
      </div>
  </Fragment>
  )
}

export default AdminDashboard