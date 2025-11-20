import React from "react";
import "./HeaderSix.css";
const HeaderSix = ({ data }) => {
  return (
    <div className="HeaderSix">
      <div className="bgImg">
        <img
          src={`https://coupon-lands.com/back-end/${data?.image[0]?.url}`}
          alt=""
        />
        <div className="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="144"
            height="62"
            viewBox="0 0 144 62"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M111.34 23.88C100.72 13.42 92.84 0 72.6 0H71.4C51.16 0 43.28 13.42 32.66 23.88C24.94 33.52 13.22 35.62 0 36V62H144V36C130.78 35.62 119.06 33.52 111.34 23.88Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="roundedImg">
          <img
            src={`https://coupon-lands.com/back-end/${data?.image[0]?.url}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderSix;
