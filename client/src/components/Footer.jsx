import React, { useEffect, useState } from "react";
import logoIcon from "../images/logo-light.png";
import axios from "axios";
import { BASE_URL } from "../api/api";

function Footer() {
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [fax, setFax] = useState(null);
  const [address, setAddress] = useState(null);
  useEffect(() => {
    const getHero = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/footer`);
      setEmail(data.email);
      setPhone(data.phone);
      setFax(data.fax);
      setAddress(data.address);
    };
    getHero();
  }, [email, phone, fax, address]);
  return (
    <footer className="footer bg-dark pt-5 pb-4 mt-5">
      <div className="container pb-2 text-center text-md-start">
        <div className="row pt-md-3 pb-3">
          <div className="col-lg-3 col-md-2">
            <a
              className="d-block mx-auto mb-4"
              href="index.html"
              style={{ width: "200px" }}
            >
              <img src={logoIcon} alt="Around" />
            </a>
          </div>
          <div className="col-lg-3 col-md-4 pb-4">
            <div className="widget widget-light">
              <h4 className="widget-title mb-3">تواصل معنا</h4>
              <ul>
                {email !== null && (
                  <li className="text-info">
                    <span className="text-light">البريد الالكتروني</span> {email}
                  </li>
                )}
                {phone !== null && (
                  <li className="text-info">
                    <span className="text-light">رقم الهاتف:</span> {phone}
                  </li>
                )}
                {fax !== null && (
                  <li className="text-info">
                    <span className="text-light">فاكس:</span> {fax}
                  </li>
                )}
                {address !== null && (
                  <li className="text-info">
                    <span className="text-light">العنوان:</span> {address}
                  </li>
                )}
              </ul>
            </div>
          </div>
         

          <div className="col-md-3 pb-4">
            <div className="widget widget-light">
              <h4 className="widget-title mb-3">تابع</h4>
              <a
                className="btn-social bs-outline bs-light bs-facebook bs-lg me-2 mb-2"
                href="#"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="btn-social bs-outline bs-light bs-twitter bs-lg me-2 mb-2"
                href="#"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="btn-social bs-outline bs-light bs-instagram bs-lg mx-2 mb-2"
                href="#"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                className="btn-social bs-outline bs-light bs-google bs-lg mb-2"
                href="#"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <p className="fs-sm text-center mb-0">
          <span className="text-light opacity-50">
          © جميع الحقوق محفوظة. مصنوع بواسطة{" "}
          </span>
          <a
            className="nav-link-style nav-link-light"
            href="/"
            target="_blank"
            rel="noopener"
          >
            دليل السائق العراقي
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

// <div className="col-md-3 pb-4">
// <div className="widget widget-light">
//   <h4 className="widget-title mb-3">
//     <Link to="/" className="text-light">
//       Collaboration
//     </Link>
//   </h4>

//   <h4 className="widget-title mb-3">
//     <Link to="/" className="text-light">
//       Privacy
//     </Link>
//   </h4>

//   <h4 className="widget-title mb-3">
//     <Link to="/" className="text-light">
//       Terms
//     </Link>
//   </h4>

//   <h4 className="widget-title mb-3">
//     <Link to="/about" className="text-light">
//       About Us
//     </Link>
//   </h4>
// </div>
// </div>