import React from 'react';
import shapeOne from "../images/shape-1.png";
import shapeTwo from "../images/shape-2.png";
import shapeThree from "../images/shape-3.png";
import shapeFour from "../images/shape-4.png";
import linesImg from "../images/lines.png";
import aboutImg from "../images/image.png";
import { Link } from 'react-router-dom';



function AboutUs() {
  return (
    <section className="position-relative mt-7">
    <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-65"></div>
    <div className="position-relative zindex-5 container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-7 order-md-2 overflow-hidden">
          <div className="parallax me-n7 me-md-0" style={{maxWidth: "1030px"}}><img className="d-block" src={linesImg} alt="Lines"/>
            <div className="parallax-layer" style={{zIndex: "2"}} data-depth="0.13"><img src={aboutImg} alt="Image"/></div>
            <div className="parallax-layer" style={{zIndex: "3"}} data-depth="0.25"><img src={shapeOne} alt="Badge"/></div>
            <div className="parallax-layer" data-depth="0.2"><img src={shapeTwo} alt="Shape"/></div>
            <div className="parallax-layer" style={{zIndex: "3"}} data-depth="0.5"><img src={shapeThree} alt="Badge"/></div>
            <div className="parallax-layer" style={{zIndex: "3"}} data-depth="0.45"><img src={shapeFour} alt="Badge"/></div>
          </div>
        </div>
        <div className="col-lg-5 col-md-5 pt-4 pb-5 py-md-5">
          <div className="mx-auto me-lg-4 ps-xl-3 order-md-1 text-center text-md-start" style={{maxWidth: "420px"}}>
            <h1 className="text-light mb-3">About Us</h1>
            <p className="text-light fs-lg">We offer flexible marketing strategies</p>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start pb-3 pb-xl-5 mb-5"><Link className="btn btn-primary me-4" to="/">Start Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default AboutUs