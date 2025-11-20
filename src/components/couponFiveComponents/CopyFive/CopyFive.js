import React, { useRef } from "react";
import "./CopyFive.css";
import { toast } from "react-toastify";
const CopyFive = ({ data }) => {
  const inputRef = useRef(null);
  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand("copy");
    toast.success("code copied successfully");
    if (typeof window.gtag_report_conversion === "function") {
      try { window.gtag_report_conversion(); } catch {}
    }
  };
  const type = data?.data?.coupons?.type;
  const couponCode = data?.data?.coupons?.code;
  const couponLink = data?.data?.coupons?.link;
  const StoreLink = data?.language?.link;
  const language = data?.data?.language;

  return (
    <>
      {type === "link" ? (
        <div className="CopyCode">
          <div className="buttonsCopy">
            <a href={couponLink} target="blank">
              {language === "ar" ? "احصل على العرض" : "GET OFFER"}
            </a>
          </div>
        </div>
      ) : type === "code" ? (
        <div className="CopyCode">
          <div className="codeBox">
            <input
              type="text"
              defaultValue={couponCode}
              readOnly
              ref={inputRef}
            />
          </div>
          <div className="buttonsCopy">
            <button className="copyCoupon" onClick={copyToClipboard}>
              {language === "ar" ? "اضغط هنا لنسخ الكوبون" : "COPY CODE"}
            </button>
            <a href={StoreLink} target="blank">
              {language === "ar" ? "احصل على العرض" : "GET OFFER"}
            </a>
          </div>
        </div>
      ) : (
        <div className="CopyCode">
          <div className="codeBox">
            <input
              type="text"
              defaultValue={couponCode}
              readOnly
              ref={inputRef}
            />
          </div>
          <div className="buttonsCopy">
            <button
              className="copyCoupon"
              onClick={async () => {
                await copyToClipboard();
                window.location.href = couponLink;
              }}
            >
              {language === "ar" ? "اضغط هنا لنسخ الكوبون" : "COPY CODE"}
            </button>
            <a href={couponLink}>
              {language === "ar" ? "احصل على العرض" : "GET OFFER"}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default CopyFive;
