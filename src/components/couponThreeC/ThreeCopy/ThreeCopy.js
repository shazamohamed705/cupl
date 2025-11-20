import React, { useRef } from "react";
import "./ThreeCopy.css";
import { toast } from "react-toastify";
const ThreeCopy = ({ data }) => {
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
    <div className="ThreeCopy">
      {type === "link" ? (
        <div className="ThreeCopy_btn">
          <button className="ThreeCopy_GETBTN getOffer">
            <a href={couponLink}>
              {language === "en" ? "GET OFFER" : "أحصل على الخصم"}
            </a>
          </button>
        </div>
      ) : type === "code" ? (
        <>
          <div className="ThreeCopy_btn">
            <input
              type="text"
              defaultValue={couponCode}
              readOnly
              ref={inputRef}
            />
            <button className="ThreeCopy_GETBTN" onClick={copyToClipboard}>
              {language === "en" ? "GET CODE" : "أنسخ الكود"}
            </button>
          </div>
          <a href={StoreLink} className="visit">
            {language === "en" ? "VISIT WEBSITE" : "زيارة الموقع"}
          </a>
        </>
      ) : (
        <div className="ThreeCopy_btn">
          <input
            type="text"
            defaultValue={couponCode}
            readOnly
            ref={inputRef}
          />
          <button
            className="ThreeCopy_GETBTN"
            onClick={async () => {
              await copyToClipboard();
              window.location.href = couponLink;
            }}
          >
            {language === "en" ? "GET CODE" : "أنسخ الكود"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ThreeCopy;
