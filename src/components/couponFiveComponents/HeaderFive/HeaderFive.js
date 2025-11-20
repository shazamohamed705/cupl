import React from "react";
import "./HeaderFive.css";
const HeaderFive = ({ data }) => {
  // const store = data?.language?.store;
  // const discountPercentage = data?.data?.coupons?.discount_percentage;
  // const language = data?.data?.language;
  const title = data?.data?.coupons?.title;

  const description = data?.language?.coupons;


  return (
    <>
      <div className="HeaderFive">
        <div className="HeaderFive-img">
          <img
            src={`https://coupon-lands.com/back-end/${data?.data?.image[0]?.url}`}
            alt="pic"
          />
        </div>
        <div className="HeaderFive-text">
          <h1 className="text-center">
            {title}
          </h1>
          {/* {language === "ar" ? (
            <h1 className="text-center">
              كود خصم {store}{" "}
              {discountPercentage ? `${discountPercentage}%` : ""} لفترة محدودة
            </h1>
          ) : (
            <h1 className="text-center">
              {store} discount code{" "}
              {discountPercentage ? `${discountPercentage}%` : ""} for a limited
              time
            </h1>
          )} */}
          <p className="text-center">{description ?? ""}</p>
        </div>
      </div>
    </>
  );
};

export default HeaderFive;
