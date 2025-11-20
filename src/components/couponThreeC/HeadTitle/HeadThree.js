import React from "react";
import "./HeadThree.css";
// import imgTest from '../../../assets/images/Logo.png'
const HeadThree = ({ data }) => {
  // const store = data?.language?.store;
  const title = data?.data?.coupons?.title;
  const description = data?.language?.coupons;
  const discountPercentage = data?.data?.coupons?.discount_percentage;
  const language = data?.data?.language;
  return (
    <div
      className="headThree"
      style={{ direction: `${language === "ar" ? "rtl" : "ltr"} ` }}
    >
      <div className="headThree_title">
        <div className="headThree_img">
          <img
            src={`https://coupon-lands.com/back-end/${data?.data?.image[0]?.url}`}
            alt="logo"
          />
          {language === "en"
            ? discountPercentage && <span>{discountPercentage}% OFF</span>
            : discountPercentage && <span>{discountPercentage}% خصم</span>}
        </div>
        <h2>{title}</h2>
        {/* {language === "en" ? (
          <h2>
            {store} discount code <br />{" "}
            {discountPercentage ? `${discountPercentage}% sale` : ""}{" "}
          </h2>
        ) : (
          <h2>
            كود خصم {store} <br />{" "}
            {discountPercentage ? `${discountPercentage}% خصم` : ""}{" "}
          </h2>
        )} */}
      </div>
      <div className="headThree_description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HeadThree;
