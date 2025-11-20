import React from "react";
import "./Footer.css";
import GlobalFooterLinks from "../../GlobalFooterLinks";
const Footer = (props) => {
  const year = new Date().getFullYear();
  return (
    <footer className={`footert ${props.class}`}>
      <div className="container">
        {props.lang === "en" ? (
          <p>All rights reserved © {year}</p>
        ) : (
          <p>جميع الحقوق محفوظة © {year}</p>
        )}
        <GlobalFooterLinks className="links_footer" variant="inline" />
      </div>
    </footer>
  );
};

export default Footer;
