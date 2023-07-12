import React from "react";

import Navbar from "./Navbar/Navbar";

function Header({ userData }) {
  return (
    <header className="header navbar navbar-expand-lg navbar-light bg-light navbar-sticky navbar-stuck">
      <Navbar userData={userData} />
    </header>
  );
}

export default Header;
