import React, { Fragment } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CreateOrder from "../components/CreateOrder/CreateOrder";
import Features from "../components/Features";
import OurServices from "../components/OurServices";
import PopularQuestions from "../components/PopularQuestions";
import Documentation from "../components/Documentation";

function Home({ userData }) {
  
  return (
    <Fragment>
      <Hero />
      <CreateOrder userData={userData}/>
      <Documentation />
      <PopularQuestions />
      <Features />
      <OurServices />
      <Footer />
    </Fragment>
  );
}

export default Home;

