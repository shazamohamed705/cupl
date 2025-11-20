import React from "react";
import "./FooterFive.css";
import GlobalFooterLinks from "../../GlobalFooterLinks";
const FooterFive = (props) => {
  const year = new Date().getFullYear();
  return (
    <footer className="footerFive">
      <GlobalFooterLinks className="links_footer" variant="inline" />
      {
              props.lang === 'ar' ? <p>جميع الحقوق محفوظة © {year}</p> : <p>All rights reserved © {year}</p>
            }
      
    </footer>
  );
};

export default FooterFive;
