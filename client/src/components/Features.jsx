import React from "react";
import screenOne from "../images/screen01.png";
import { useTranslation } from 'react-i18next';

function Features() {
  const { t, i18n } = useTranslation();

  return (
    <section className="bg-secondary position-relative pt-lg-3 pt-xl-4 pt-xxl-5 mt-7">
      <div
        className="bg-primary position-absolute start-0 bottom-0 w-100 d-none d-xl-block"
        style={{ height: "920px;" }}
      ></div>
      <div
        className="bg-primary position-absolute start-0 bottom-0 w-100 d-none d-lg-block d-xl-none"
        style={{ height: "830px;" }}
      ></div>
      <div
        className="bg-primary position-absolute start-0 bottom-0 w-100 d-lg-none d-xl-none"
        style={{ height: "62%;" }}
      ></div>
      <div
        className="bg-faded-dark rounded-circle position-absolute start-50 d-none d-lg-block"
        style={{
          bottom: "220px;",
          width: "480px",
          height: "480px;",
          marginLeft: "-240px;",
        }}
      ></div>
      <div className="container-fluid position-relative zindex-5 mt-2 pt-5 pb-2 pb-sm-4 pb-lg-5">
        <h1
          className="display-3 text-center mx-auto pt-5 my-2 my-sm-4"
          style={{ maxWidth: "680px;" }}
        >
          {t("titleSectionFeatures")}
        </h1>
        <svg
          className="d-block mx-auto text-primary"
          width="511"
          height="40"
          viewBox="0 0 511 40"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M385.252 0.160149C313.41 0.614872 292.869 0.910678 253.008 2.06539C211.7 3.26203 182.137 4.46154 135.231 6.84429C124.358 7.39665 112.714 7.92087 99.0649 8.47247C48.9242 10.4987 39.1671 11.0386 22.9579 12.6833C14.9267 13.4984 7.98117 14.0624 4.08839 14.2162C0.627411 14.3527 0 14.4386 0 14.7762C0 15.0745 5.53537 15.3358 8.56298 15.1804C9.64797 15.1248 12.5875 14.9887 15.0956 14.8782C17.6037 14.7676 23.123 14.4706 27.3608 14.2183C37.3399 13.6238 42.1312 13.4363 59.2817 12.9693C88.1133 12.1844 109.893 11.43 136.647 10.2898C146.506 9.86957 159.597 9.31166 165.737 9.04993C212.308 7.06466 269.195 5.29439 303.956 4.74892C346.139 4.08665 477.094 3.50116 474.882 3.98441C474.006 4.17607 459.021 5.6015 450.037 6.34782C441.786 7.03345 428 8.02235 411.041 9.14508C402.997 9.67773 391.959 10.4149 386.51 10.7832C366.042 12.1673 359.3 12.5966 347.67 13.2569C294.096 16.2987 258.708 18.9493 209.451 23.6091C180.174 26.3788 156.177 29.5584 129.396 34.2165C114.171 36.8648 112.687 37.3352 114.186 39.0402C115.161 40.1495 122.843 40.2933 138.338 39.492C166.655 38.0279 193.265 36.8923 219.043 36.048C235.213 35.5184 237.354 35.4296 253.795 34.6075C259.935 34.3005 270.549 33.8517 277.382 33.6105L289.804 33.1719L273.293 32.999C248.274 32.7369 221.435 32.7528 212.596 33.035C183.334 33.9693 167.417 34.6884 141.419 36.2506C135.222 36.623 129.994 36.8956 129.801 36.8566C127.94 36.4786 169.612 30.768 189.492 28.6769C234.369 23.956 280.582 20.4337 351.602 16.3207C358.088 15.9451 371.108 15.1233 380.535 14.4947C389.962 13.866 404.821 12.8761 413.556 12.2946C447.177 10.057 457.194 9.22358 489.506 5.97543C510.201 3.895 510.311 3.8772 510.875 2.50901C511.496 1.00469 509.838 0.322131 505.088 0.127031C500.576 -0.0584957 416.098 -0.0351424 385.252 0.160149ZM291.144 33.02C291.536 33.0658 292.102 33.0641 292.402 33.0162C292.703 32.9683 292.383 32.9308 291.691 32.9329C290.999 32.935 290.753 32.9743 291.144 33.02Z"></path>
        </svg>
        <div className="row justify-content-center bg-primary pt-3 pt-sm-4 pt-md-5 mt-sm-1">
          <div
            className="col-8 col-lg-4 order-lg-2"
            style={{ marginTop: "-105px;" }}
          >
            <div
              className="position-sticky top-0 mb-5 pb-sm-2 pb-xl-4"
              style={{ paddingTop: "110px;" }}
            >
              <img
                className="d-block mx-auto"
                src="https://aglietech.wowtheme7.com/assets/img/about/1.png"
                width="322"
                alt="App screen"
              />
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 order-lg-1 overflow-hidden mt-lg-4 pt-xl-3">
            <img
              className="d-none d-lg-block rounded-4 ms-auto"
              src={screenOne}
              width="297"
              alt="App screen"
              style={{
                boxShadow: "0 .9375rem 3rem -.5rem rgba(18,34,50, .05);",
              }}
            />
            <div
              className="d-none d-xxl-block"
              style={{ height: "310px;" }}
            ></div>
            <div
              className="d-none d-xl-block d-xxl-none"
              style={{ height: "280px;" }}
            ></div>
            <div
              className="d-none d-lg-block d-xl-none"
              style={{ height: "200px;" }}
            ></div>

            <div
              className="mb-5 mx-auto mx-sm-0 pb-lg-2 pb-xl-4 mt-3"
              style={{ maxWidth: "340px;" }}
            >
              <div className="d-table bg-faded-dark rounded-1 p-2 mb-3 mb-lg-4">
                <i className="fas fa-desktop-alt text-warning fa-2x"></i>
              </div>
              <h2 className="h4 text-white mb-2 mb-lg-3">
              {t("accessOnAllDevices")}

              </h2>
              <p className="text-white opacity-80 mb-0">
              {t("youCanAccessTheWebsiteOnAllDevices")}.

              </p>
            </div>
            <div
              className="mb-5 mx-auto mx-sm-0 pb-lg-2 pb-xl-4"
              style={{ maxWidth: "340px;" }}
              data-disable-parallax-down="lg"
            >
              <div className="d-table bg-faded-dark rounded-1 p-2 mb-3 mb-lg-4">
                <i className="fas fa-headset text-warning fa-2x"></i>
              </div>
              <h2 className="h4 text-white mb-2 mb-lg-3">{t("support")}</h2>
              <p className="text-white opacity-80 mb-0 text-capitalize">
              {t("enjoySupporting")}.
                
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 order-lg-3 overflow-hidden mt-lg-4 pt-xl-3">
            <img
              className="d-none d-lg-block rounded-4"
              src="https://web.moxcreative.com/kassapay/wp-content/uploads/sites/10/2023/02/wallet.png"
              width="297"
              alt="App screen"
              style={{
                boxShadow: "0 .9375rem 3rem -.5rem rgba(18,34,50, .05);",
              }}
            />
            <div
              className="d-none d-xxl-block"
              style={{ height: "520px;" }}
            ></div>
            <div
              className="d-none d-xl-block d-xxl-none"
              style={{ height: "490px;" }}
            ></div>
            <div
              className="d-none d-lg-block d-xl-none"
              style={{ height: "400px;" }}
            ></div>

            <div
              className="mb-5 mx-auto me-sm-0 pb-lg-2 pb-xl-4 mt-3"
              style={{ maxWidth: "340px;" }}
              data-disable-parallax-down="lg"
            >
              <div className="d-table bg-faded-dark rounded-1 p-2 mb-3 mb-lg-4">
                <i className="fas fa-hand-holding-usd text-warning fa-2x"></i>
              </div>
              <h2 className="h4 text-white mb-2 mb-lg-3">{t("payOnline")}</h2>
              <p className="text-white opacity-80 mb-0">
                {t("payFinesOnline")}.
              </p>
            </div>
            <div
              className="mb-5 mx-auto me-sm-0 pb-lg-2 pb-xl-4 "
              style={{ maxWidth: "340px;" }}
              data-disable-parallax-down="lg"
            >
              <div className="d-table bg-faded-dark rounded-1 p-2 mb-3 mb-lg-4">
                <i className="fas fa-user-shield text-warning fa-2x"></i>
              </div>
              <h2 className="h4 text-white mb-2 mb-lg-3">{t("account")}</h2>
              <p className="text-white opacity-80 mb-0">
                {t("easeCreatingAccount")}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
