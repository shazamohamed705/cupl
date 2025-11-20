import React, { useEffect, useRef, useState } from "react";
import "./CopyPart.css";
import { toast } from "react-toastify";
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
const CopyPart = ({ data }) => {
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
  const inputRef = useRef(null);
  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand("copy");
    toast.success("code copied successfully");
    if (typeof window.gtag_report_conversion === "function") {
      try { window.gtag_report_conversion(); } catch {}
    }
    
    // Add visual feedback
    const button = document.querySelector('.btnCopy button');
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    }
  };
  const [active, setActive] = useState(false);

  const type = data?.data?.coupons?.type;
  const couponCode = data?.data?.coupons?.code;
  const couponLink = data?.data?.coupons?.link;
  const StoreLink = data?.language?.link;
  const language = data?.data?.language;
  const shareUrl =
  couponCode
   ? 
   `Coupon code: ${couponCode}. Store link: ${couponLink ?? StoreLink}`
   : StoreLink;
  return (
    <div className="CopyPart">
      {type === "link" ? (
        <div className="btn_copy btn_copy2">
          <button id="copy">
            <a href={couponLink} target="blank">
              GET OFFER
            </a>
          </button>
        </div>
      ) : type === "code" ? (
        <div className="btnCopy">
          <input
            type="text"
            ref={inputRef}
            defaultValue={couponCode}
            readOnly
          />
          <button onClick={copyToClipboard}>
            {language === "en" ? "Get Code" : "انسخ الكود"}
          </button>
        </div>
      ) : (
        <>
          <div className="btnCopy">
            <input
              type="text"
              ref={inputRef}
              defaultValue={couponCode}
              readOnly
            />
            <button
              onClick={async () => {
                await copyToClipboard();
                window.location.href = couponLink;
              }}
            >
              {language === "en" ? "Get Code" : "انسخ الكود"}
            </button>
          </div>
        </>
      )}

      <div className="shareBtnsVisit">
        <div className="shareBtn">
          <button href="##" onClick={() => setActive(!active)}>
            {isMobile ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.58984 13.51L15.4198 17.49M15.4098 6.51001L8.58984 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M10.0215 15.7617L17.9898 20.405M17.9782 7.59502L10.0215 12.2384M24.5 5.83334C24.5 7.76634 22.933 9.33334 21 9.33334C19.067 9.33334 17.5 7.76634 17.5 5.83334C17.5 3.90035 19.067 2.33334 21 2.33334C22.933 2.33334 24.5 3.90035 24.5 5.83334ZM10.5 14C10.5 15.933 8.933 17.5 7 17.5C5.067 17.5 3.5 15.933 3.5 14C3.5 12.067 5.067 10.5 7 10.5C8.933 10.5 10.5 12.067 10.5 14ZM24.5 22.1667C24.5 24.0997 22.933 25.6667 21 25.6667C19.067 25.6667 17.5 24.0997 17.5 22.1667C17.5 20.2337 19.067 18.6667 21 18.6667C22.933 18.6667 24.5 20.2337 24.5 22.1667Z"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <span className="titleShare">{language === 'en' ? "share" : 'مشاركة'}</span>
        </div>
        <div className="shareBtn">
          <a href={StoreLink} target="blank">
            {isMobile ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M9.58333 12.4583C9.99489 13.0085 10.52 13.4638 11.1229 13.7932C11.7259 14.1226 12.3927 14.3185 13.078 14.3676C13.7634 14.4167 14.4513 14.3178 15.095 14.0777C15.7388 13.8375 16.3234 13.4618 16.8092 12.9758L19.6842 10.1008C20.557 9.19709 21.04 7.98671 21.0291 6.73035C21.0181 5.47399 20.5142 4.27218 19.6258 3.38376C18.7374 2.49535 17.5356 1.99141 16.2792 1.9805C15.0229 1.96958 13.8125 2.45255 12.9088 3.32539L11.2604 4.96414M13.4169 10.5417C13.0053 9.99145 12.4802 9.53619 11.8772 9.20676C11.2743 8.87732 10.6075 8.68142 9.92215 8.63234C9.23681 8.58326 8.54892 8.68214 7.90515 8.92228C7.26138 9.16243 6.67679 9.53822 6.19103 10.0242L3.31602 12.8992C2.44318 13.8029 1.96021 15.0133 1.97113 16.2696C1.98205 17.526 2.48598 18.7278 3.37439 19.6162C4.26281 20.5046 5.46462 21.0086 6.72098 21.0195C7.97734 21.0304 9.18772 20.5474 10.0914 19.6746L11.7302 18.0358"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
              >
                <g clipPath="url(#clip0_159_1243)">
                  <path
                    d="M11.25 14.0833C11.7331 14.7053 12.3495 15.2199 13.0574 15.5923C13.7652 15.9647 14.5479 16.1862 15.3525 16.2417C16.157 16.2972 16.9645 16.1854 17.7203 15.9139C18.476 15.6424 19.1623 15.2176 19.7325 14.6683L23.1075 11.4183C24.1321 10.3967 24.6991 9.02845 24.6863 7.60822C24.6735 6.18798 24.0819 4.82942 23.039 3.82512C21.9961 2.82083 20.5852 2.25116 19.1104 2.23882C17.6355 2.22648 16.2146 2.77245 15.1538 3.75914L13.2188 5.61164M15.7502 11.9167C15.2671 11.2947 14.6507 10.78 13.9429 10.4076C13.235 10.0352 12.4523 9.81378 11.6477 9.75829C10.8432 9.70281 10.0357 9.81459 9.27996 10.0861C8.52423 10.3575 7.83797 10.7823 7.26772 11.3317L3.89272 14.5817C2.86809 15.6033 2.30112 16.9715 2.31393 18.3917C2.32675 19.812 2.91832 21.1705 3.96125 22.1748C5.00417 23.1791 6.41499 23.7488 7.88984 23.7611C9.3647 23.7735 10.7856 23.2275 11.8465 22.2408L13.7702 20.3883"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_159_1243">
                    <rect width="27" height="26" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </a>
          <span className="titleShare">{language === 'en' ? "Visit Website" : 'زيارة الموقع'}</span>
        </div>
      </div>
      <div className={`shareCotainer ${active && "active_share"}`}>
        <FacebookShareButton url={shareUrl}>
          <i className="ri-facebook-circle-fill" />
        </FacebookShareButton>
        <FacebookMessengerShareButton url={shareUrl}>
          <i className="ri-messenger-line"></i>
        </FacebookMessengerShareButton>
        <WhatsappShareButton url={shareUrl}>
          <i className="ri-whatsapp-line" />
        </WhatsappShareButton>
        <TwitterShareButton url={shareUrl}>
          <i className="ri-twitter-x-fill" />
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default CopyPart;
