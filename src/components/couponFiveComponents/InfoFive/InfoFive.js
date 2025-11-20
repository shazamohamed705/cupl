import React from "react";
import "./InfoFive.css";
const InfoFive = ({ data }) => {
  const countries = data?.pluckCountries;
  const discountPercentage = data?.data?.coupons?.discount_percentage;
  const description = data?.language?.coupons;
  const language = data?.data?.language;

  return (
    <div className="InfoFive">
      <div className="infoCoupon">
        <ul>
          {countries && (
            <li>
              <p>
                {language === "ar" ? (
                  <>
                    <span>الكوبون يعمل في: </span> <>{countries}</>
                  </>
                ) : (
                  <>
                    <span>Coupon active in: </span> <>{countries}</>
                  </>
                )}
              </p>
            </li>
          )}
          {discountPercentage && (
            <li>
              <p>
                {
                  language === 'ar' ? 

                  <>
                <span>نسبة الخصم :</span> <>{discountPercentage}</>% خصم
                  </>
                  :
                  <>
                  <span>discount percentage :</span> <>{discountPercentage}</>% off
                    </>
                }
              </p>
            </li>
          )}
          <li>
            <p>
            {
                  language === 'ar' ? 

                  <>
              <span>تاريخ الانتهاء :</span> لا يوجد
              </>
                  :
                  <>
              <span>Expired date :</span> effictive
              </>
                }
            </p>
          </li>
        </ul>
      </div>
      {description && (
        <div className="couponContent">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default InfoFive;
