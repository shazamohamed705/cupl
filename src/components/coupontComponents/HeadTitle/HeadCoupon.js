import React from "react";
import "./HeadCoupon.css";
// import logo from '../../../assets/images/logo.jfif'
const HeadCoupon = ({ data }) => {
  const title = data?.data?.coupons?.title;
  // const store = data?.language?.store;
  const description = data?.language?.coupons;
  // const discountPercentage = data?.data?.coupons?.discount_percentage;
  const language = data?.data?.language;
  return (
    <div
      className="HeadCoupon"
      style={{ direction: language === "ar" ? "rtl" : "" }}
    >
      <div className="HeadCoupon_title">
        <div className="radiousLogo">
          <img
            src={`https://coupon-lands.com/back-end/${data?.data?.image[0]?.url}`}
            alt="logo"
          />
        </div>
        <h1>
        {title} <br />
        {/* {discountPercentage && (
          <>
            <span>{discountPercentage}%</span> خصم
          </>
        )} */}
      </h1>
        {/* {language === "en" ? (
          <h1>
            {title} <br />
            {discountPercentage && (
              <>
                <span>{discountPercentage}%</span> off
              </>
            )}
          </h1>
        ) : (
          <h1>
            {title} <br />
            {discountPercentage && (
              <>
                <span>{discountPercentage}%</span> خصم
              </>
            )}
          </h1>
        )} */}
      </div>
      <div className="HeadCoupon_description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HeadCoupon;
