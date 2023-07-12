import React, { useEffect, useState } from "react";
// import bgPeople from "../images/people.png";
// import heroBg from "../images/hero-bg.jpg";
import axios from "axios";
import { BASE_URL } from "../api/api";
import loadingImg from "../images/loading.gif";


function Hero() {
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  const [h1Text, setH1Text] = useState(null);
  const [spanOneText, setSpanOneText] = useState(null);
  const [spanTwoText, setSpanTwoText] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHero = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/hero`);
      setBackgroundUrl(data.background.url);
      setH1Text(data.h1);
      setSpanOneText(data.spanOne);
      setSpanTwoText(data.spanTwo);
      setLoading(true)
    };
    getHero();
  }, [backgroundUrl, spanOneText, spanTwoText]);
  if (!loading) {
    return (
      <div className="container d-flex align-items-center justify-content-center" style={{height: "65vh"}}>
        <img src={loadingImg} alt="loading" style={{ width: "200px" }} />
      </div>
    );
  }
  return (
    <section
      className={`bg-size-cover pt-5 pt-md-6 pt-lg-7 mt-4`}
      style={{
        backgroundImage: `url(${BASE_URL}/${backgroundUrl})`,
        height: "65vh",
        backgroundPosition: "center",
      }}
    >
      <div className="container position-relative zindex-5 pt-2 pb-4 pb-md-2">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-8 text-center">
            {h1Text !== "null" && <h3 className="text-light mb-4">{h1Text}</h3>}

            {spanOneText !== "null" && (
              <div className="d-inline-flex align-items-center mx-1 px-3 mb-4">
                <span className="text-light">{spanOneText}</span>
              </div>
            )}

            {spanTwoText !== "null" && (
              <div className="d-inline-flex align-items-center mx-1 px-3 mb-4">
                <span className="text-light">{spanTwoText}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </section>
  );
}

export default Hero;
