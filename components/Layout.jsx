import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="App px-12">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
