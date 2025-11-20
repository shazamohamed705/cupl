import React, { useEffect, useState } from "react";
import "./CouponLocation.css";
const CouponLocation = ({ data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const countries = data?.pluckCountries;
  const language = data?.data?.language;

  return (
    <div className="CouponLocation container" style={{direction: language === 'ar' ? "rtl" : 'ltr'}}>
      {isMobile ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12.8159 20.6077C16.8509 18.5502 20 15.1429 20 11C20 6.58172 16.4183 3 12 3C7.58172 3 4 6.58172 4 11C4 15.1429 7.14909 18.5502 11.1841 20.6077C11.6968 20.8691 12.3032 20.8691 12.8159 20.6077Z"
            stroke="#011B3C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z"
            stroke="#011B3C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M25.6317 41.2154C33.7018 37.1004 40 30.2857 40 22C40 13.1634 32.8366 6 24 6C15.1634 6 8 13.1634 8 22C8 30.2857 14.2982 37.1004 22.3683 41.2154C23.3936 41.7382 24.6064 41.7382 25.6317 41.2154Z"
            stroke="#011B3C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 22C30 25.3137 27.3137 28 24 28C20.6863 28 18 25.3137 18 22C18 18.6863 20.6863 16 24 16C27.3137 16 30 18.6863 30 22Z"
            stroke="#011B3C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {language === "ar" ? (
        <h3>
          الكوبون يعمل في :<span>{countries}</span>
        </h3>
      ) : (
        <h3>
          Coupon active in:<span>{countries}</span>
        </h3>
      )}
    </div>
  );
};

export default CouponLocation;
