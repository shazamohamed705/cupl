import React, { useRef } from 'react'
import './ContentCoupon.css'
import { toast } from 'react-toastify';
const ContentCoupon = ({data}) => {
    const inputRef = useRef(null);
    const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand('copy');
        toast.success("code copied successfully")
        if (typeof window.gtag_report_conversion === "function") {
          try { window.gtag_report_conversion(); } catch {}
        }
      };
      const title = data?.data?.coupons?.title;
      // const store = data?.language?.store;
      const description = data?.language?.coupons;
      const language = data?.data?.language;

      const type = data?.data?.coupons?.type;
      const couponCode = data?.data?.coupons?.code;
      const couponLink = data?.data?.coupons?.link;
      const StoreLink = data?.language?.link;
  return (
    <div className="content container">
      <div className="content_img_header">
        <img
          src={`https://coupon-lands.com/back-end/${data?.data?.image[0]?.url}`}
          alt="logo"
        />
      </div>
      <div className="content_txt">
        <h1 className="content_txt_head  text-center">{title}</h1>
        <p className="content_txt_body  text-center">
          {description}
        </p>
      </div>



      {type === "link" ? (
         <div className="btn_copy">
         <button id="copy">
           <a href={couponLink} target='blank'>
               {language === 'en' ? "GET OFFER" : "ااحصل على الخصم"}
           </a>
         </button>
        </div>
      ) : type === "code" ? (
        <>
          <div className="btn_copy">
          <input
            type="text"
            ref={inputRef}
            defaultValue={couponCode}
            readOnly
          />
          <button id="copy" onClick={copyToClipboard}>
          {language === 'en' ? "GET CODE" : "انسخ الكود"}

          </button>
        </div>
        <a href={StoreLink} target="blank">
        
        {language === 'en' ? "VISIT WEBSITE" : "زيارة الموقع"}

      </a>
        </>
      ) : (
        
        <div className="btn_copy">
          <input
            type="text"
            ref={inputRef}
            defaultValue={couponCode}
            readOnly
          />
          <button id="copy" onClick={async () => {
              await copyToClipboard();
              window.location.href = couponLink
            }}>
          {language === 'en' ? "GET CODE" : "انسخ الكود"}
          </button>
        </div>
      )}

{/* //////////////////////////////////////////////////////// */}
    </div>
  );
}

export default ContentCoupon