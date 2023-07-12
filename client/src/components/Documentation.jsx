import React from "react";
import svgOne from "../images/01.svg";
import svgTwo from "../images/02.svg";
import payImg from "../images/pay1.png";
import bgPattern from "../images/bg-pattern01.png";
import { useTranslation } from "react-i18next";

function Documentation() {
  const { t, i18n } = useTranslation();

  return (
    <section className="bg-gradient position-relative pt-6 pb-5 py-sm-6 my-7">
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-size-cover"
        style={{ backgroundImage: `url(${bgPattern})` }}
      ></div>
      <div className="position-relative zindex-5 container py-2">
        <div className="row align-items-center">
          <div className="col-lg-5 offset-lg-1 order-lg-2 pb-5 pb-lg-0 text-center text-lg-start">
            <h3 className="text-light">{t("howDoYouPay")}</h3>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="row">
              <div className="col-sm-4 mb-2 pb-4 mb-sm-0 pb-sm-0">
                <div className="px-2 text-center">
                  <img
                    className="bg-light rounded-circle mb-2"
                    src={svgOne}
                    alt="Tickets"
                    width="105"
                  />
                  <p className="fs-sm fw-medium text-light mb-0 pt-1">
                  {t("createAnAccount")}
                  </p>
                </div>
              </div>
              <div className="col-sm-4 mb-2 pb-4 mb-sm-0 pb-sm-0">
                <div className="px-2 text-center">
                  <img
                    className="bg-light rounded-circle mb-2"
                    src={svgTwo}
                    alt="Search"
                    width="105"
                  />
                  <p className="fs-sm fw-medium text-light mb-0 pt-1">
                  {t("payTheFineBySearch")}
                  </p>
                </div>
              </div>
              <div className="col-sm-4 mb-2 pb-4 mb-sm-0 pb-sm-0">
                <div className="px-2 text-center">
                  <img
                    className="bg-light rounded-circle mb-2"
                    src={payImg}
                    alt="Flight"
                    width="105"
                  />
                  <p className="fs-sm fw-medium text-light mb-0 pt-1">
                  {t("payTheFineByReceipt")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Documentation;
