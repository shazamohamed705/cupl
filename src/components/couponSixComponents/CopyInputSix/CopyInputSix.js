import React from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import "./CopySix.css";
const CopyInputSix = ({ data }) => {
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
    <div className="CopyInputSix">
      <div className="CopySix">
        {type === "link" ? (
          <div className="CopySix_btn">
            <button className="CopySix_GETBTN getOfferSix">
              <a href={couponLink}>
                {language === "en" ? "GET OFFER" : "أحصل على الخصم"}
              </a>
            </button>
          </div>
        ) : type === "code" ? (
          <>
            <div className="CopySix_btn">
              <input
                type="text"
                defaultValue={couponCode}
                readOnly
                ref={inputRef}
              />
              <button
                className="CopySix_GETBTN"
                onClick={async () => {
                  await copyToClipboard();
                  window.location.href = couponLink;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    opacity="0.4"
                    d="M15.5 13.15H13.33C11.55 13.15 10.1 11.71 10.1 9.92V7.75C10.1 7.34 9.77 7 9.35 7H6.18C3.87 7 2 8.5 2 11.18V17.82C2 20.5 3.87 22 6.18 22H12.07C14.38 22 16.25 20.5 16.25 17.82V13.9C16.25 13.48 15.91 13.15 15.5 13.15Z"
                    fill="white"
                  />
                  <path
                    d="M17.8198 2H15.8498H14.7598H11.9298C9.66977 2 7.83977 3.44 7.75977 6.01C7.81977 6.01 7.86977 6 7.92977 6H10.7598H11.8498H13.8198C16.1298 6 17.9998 7.5 17.9998 10.18V12.15V14.86V16.83C17.9998 16.89 17.9898 16.94 17.9898 16.99C20.2198 16.92 21.9998 15.44 21.9998 12.83V10.86V8.15V6.18C21.9998 3.5 20.1298 2 17.8198 2Z"
                    fill="white"
                  />
                  <path
                    d="M11.9801 7.15024C11.6701 6.84024 11.1401 7.05024 11.1401 7.48024V10.1002C11.1401 11.2002 12.0701 12.1002 13.2101 12.1002C13.9201 12.1102 14.9101 12.1102 15.7601 12.1102C16.1901 12.1102 16.4101 11.6102 16.1101 11.3102C15.0201 10.2202 13.0801 8.27024 11.9801 7.15024Z"
                    fill="white"
                  />
                </svg>
                {language === "en" ? "Copy" : "نسخ"}
              </button>
            </div>
            <a href={StoreLink} className="visit text-center d-block">
              {language === "en" ? "VISIT WEBSITE" : "زيارة الموقع"}
            </a>
          </>
        ) : (
          <div className="CopySix_btn">
            <input
              type="text"
              defaultValue={couponCode}
              readOnly
              ref={inputRef}
            />
            <button
              className="CopySix_GETBTN"
              onClick={async () => {
                await copyToClipboard();
                window.location.href = couponLink;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  opacity="0.4"
                  d="M15.5 13.15H13.33C11.55 13.15 10.1 11.71 10.1 9.92V7.75C10.1 7.34 9.77 7 9.35 7H6.18C3.87 7 2 8.5 2 11.18V17.82C2 20.5 3.87 22 6.18 22H12.07C14.38 22 16.25 20.5 16.25 17.82V13.9C16.25 13.48 15.91 13.15 15.5 13.15Z"
                  fill="white"
                />
                <path
                  d="M17.8198 2H15.8498H14.7598H11.9298C9.66977 2 7.83977 3.44 7.75977 6.01C7.81977 6.01 7.86977 6 7.92977 6H10.7598H11.8498H13.8198C16.1298 6 17.9998 7.5 17.9998 10.18V12.15V14.86V16.83C17.9998 16.89 17.9898 16.94 17.9898 16.99C20.2198 16.92 21.9998 15.44 21.9998 12.83V10.86V8.15V6.18C21.9998 3.5 20.1298 2 17.8198 2Z"
                  fill="white"
                />
                <path
                  d="M11.9801 7.15024C11.6701 6.84024 11.1401 7.05024 11.1401 7.48024V10.1002C11.1401 11.2002 12.0701 12.1002 13.2101 12.1002C13.9201 12.1102 14.9101 12.1102 15.7601 12.1102C16.1901 12.1102 16.4101 11.6102 16.1101 11.3102C15.0201 10.2202 13.0801 8.27024 11.9801 7.15024Z"
                  fill="white"
                />
              </svg>
              {language === "en" ? "Copy" : "نسخ"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CopyInputSix;
