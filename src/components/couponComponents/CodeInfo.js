import React from "react";
import "./CodeInfo.css";
const CodeInfo = ({ data }) => {
  const language = data?.data?.language;
  const countries = data?.pluckCountries;
  const discountPercentage = data?.data?.coupons?.discount_percentage;

  return (
    <div className="code_offer container" style={{direction: language === 'ar' ? 'rtl' : 'ltr'}}>
      <div className="expire_date code_offer_title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M16 4C16 3.17157 15.3284 2.5 14.5 2.5C13.6716 2.5 13 3.17157 13 4V9C13 9.82843 13.6716 10.5 14.5 10.5C15.3284 10.5 16 9.82843 16 9V4Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 9V10.5H20.5C20.7967 10.5 21.0867 10.412 21.3334 10.2472C21.58 10.0824 21.7723 9.84812 21.8858 9.57403C21.9993 9.29994 22.0291 8.99834 21.9712 8.70737C21.9133 8.41639 21.7704 8.14912 21.5607 7.93934C21.3509 7.72956 21.0836 7.5867 20.7926 7.52882C20.5017 7.47095 20.2001 7.50065 19.926 7.61418C19.6519 7.72771 19.4176 7.91997 19.2528 8.16665C19.088 8.41332 19 8.70333 19 9Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 16C11 15.1716 10.3284 14.5 9.5 14.5C8.67157 14.5 8 15.1716 8 16V21C8 21.8284 8.67157 22.5 9.5 22.5C10.3284 22.5 11 21.8284 11 21V16Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 16V14.5H3.5C3.20333 14.5 2.91332 14.588 2.66665 14.7528C2.41997 14.9176 2.22771 15.1519 2.11418 15.426C2.00065 15.7001 1.97094 16.0017 2.02882 16.2926C2.0867 16.5836 2.22956 16.8509 2.43934 17.0607C2.64912 17.2704 2.91639 17.4133 3.20737 17.4712C3.49834 17.5291 3.79994 17.4993 4.07403 17.3858C4.34811 17.2723 4.58238 17.08 4.7472 16.8334C4.91203 16.5867 5 16.2967 5 16Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5 13.5H15.5C14.6716 13.5 14 14.1716 14 15C14 15.8284 14.6716 16.5 15.5 16.5H20.5C21.3284 16.5 22 15.8284 22 15C22 14.1716 21.3284 13.5 20.5 13.5Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 19.5H14V21C14 21.2967 14.088 21.5867 14.2528 21.8334C14.4176 22.08 14.6519 22.2723 14.926 22.3858C15.2001 22.4993 15.5017 22.5291 15.7926 22.4712C16.0836 22.4133 16.3509 22.2704 16.5607 22.0607C16.7704 21.8509 16.9133 21.5836 16.9712 21.2926C17.0291 21.0017 16.9993 20.7001 16.8858 20.426C16.7723 20.1519 16.58 19.9176 16.3334 19.7528C16.0867 19.588 15.7967 19.5 15.5 19.5Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 8.5H3.5C2.67157 8.5 2 9.17157 2 10C2 10.8284 2.67157 11.5 3.5 11.5H8.5C9.32843 11.5 10 10.8284 10 10C10 9.17157 9.32843 8.5 8.5 8.5Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 5.5H10V4C10 3.70333 9.91203 3.41332 9.74721 3.16665C9.58238 2.91997 9.34812 2.72771 9.07403 2.61418C8.79994 2.50065 8.49834 2.47094 8.20737 2.52882C7.91639 2.5867 7.64912 2.72956 7.43934 2.93934C7.22956 3.14912 7.0867 3.41639 7.02882 3.70737C6.97095 3.99834 7.00065 4.29994 7.11418 4.57403C7.22771 4.84811 7.41997 5.08238 7.66665 5.2472C7.91332 5.41203 8.20333 5.5 8.5 5.5Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {language === "en" ? (
          <h2>
            Expired date : <span>Effective</span>
          </h2>
        ) : (
          <h2>
            تاريخ الإنتهاء : <span>لايوجد</span>
          </h2>
        )}
      </div>
      <div className="discount_value code_offer_title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M8 16.5L16 8.5M21 12.5C21 17.4706 16.9706 21.5 12 21.5C7.02944 21.5 3 17.4706 3 12.5C3 7.52944 7.02944 3.5 12 3.5C16.9706 3.5 21 7.52944 21 12.5ZM17 15.5C17 16.6046 16.1046 17.5 15 17.5C13.8954 17.5 13 16.6046 13 15.5C13 14.3954 13.8954 13.5 15 13.5C16.1046 13.5 17 14.3954 17 15.5ZM11 9.5C11 10.6046 10.1046 11.5 9 11.5C7.89543 11.5 7 10.6046 7 9.5C7 8.39543 7.89543 7.5 9 7.5C10.1046 7.5 11 8.39543 11 9.5Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {
        discountPercentage &&
          language === "en" ? 
        <h2>
          Discount Value : <span>{discountPercentage}% Off</span>
        </h2>
        :
        <h2>
          نسبة الخصم : <span>{discountPercentage}% خصم</span>
        </h2>
        }
      </div>
      <div className="work_in code_offer_title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M12.8159 21.1077C16.8509 19.0502 20 15.6429 20 11.5C20 7.08172 16.4183 3.5 12 3.5C7.58172 3.5 4 7.08172 4 11.5C4 15.6429 7.14909 19.0502 11.1841 21.1077C11.6968 21.3691 12.3032 21.3691 12.8159 21.1077Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 11.5C15 13.1569 13.6569 14.5 12 14.5C10.3431 14.5 9 13.1569 9 11.5C9 9.84315 10.3431 8.5 12 8.5C13.6569 8.5 15 9.84315 15 11.5Z"
            stroke="#4AA262"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {
          language === 'en' ? 

        <h2>
          Coupon active in : <span>{countries}</span>
          {/* {data?.coupons?.countries?.map((country)=>(
           <span key={country.id}>{country?.name_en},</span>
          ))} */}
        </h2>
      :  
      <h2>
          الكوبون يعمل في : <span>{countries}</span>
          {/* {data?.coupons?.countries?.map((country)=>(
           <span key={country.id}>{country?.name_en},</span>
          ))} */}
        </h2>
      }
      </div>
    </div>
  );
};

export default CodeInfo;
