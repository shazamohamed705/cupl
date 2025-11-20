import React, { useEffect, useState } from "react";
import "./ActiveBts.css";
import { AiOutlineLike, AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FacebookMessengerShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

const ActiveBtns = ({ data }) => {
  const [like, SetLike] = useState(false);
  const [disLike, SetDisLike] = useState(false);
  const StoreLink = data?.language?.link;

  const couponCode = data?.data?.coupons?.code;
  const couponLink = data?.data?.coupons?.link;
  const language = data?.data?.language;
  const shareUrl =
  couponCode
   ? 
   `Coupon code: ${couponCode}. Store link: ${couponLink ?? StoreLink}`
   : StoreLink;
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="ActiveBtns">
        <div
          className="btnActive"
          onClick={() => {
            if (disLike) {
              SetDisLike(!disLike);
            }
            SetLike(!like);
          }}
        >
          {!like ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.34997 19.58 9.34997H15.58C14.98 9.34997 14.48 8.84997 14.58 8.14997L15.08 4.94997C15.28 4.04997 14.68 3.04997 13.78 2.74997C12.98 2.44997 11.98 2.84997 11.58 3.44997L7.47998 9.54997"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path
                d="M2.37988 18.3499V8.5499C2.37988 7.1499 2.97988 6.6499 4.37988 6.6499H5.37988C6.77988 6.6499 7.37988 7.1499 7.37988 8.5499V18.3499C7.37988 19.7499 6.77988 20.2499 5.37988 20.2499H4.37988C2.97988 20.2499 2.37988 19.7499 2.37988 18.3499Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M21.6499 10.0302C21.2599 9.47022 20.5699 9.15022 19.7799 9.15022H15.6799C15.4099 9.15022 15.1599 9.04022 14.9899 8.84022C14.8099 8.64022 14.7399 8.36022 14.7799 8.07022L15.2899 4.79022C15.5099 3.81022 14.8599 2.71022 13.8799 2.38022C12.9699 2.04022 11.8999 2.50022 11.4699 3.15022L7.24988 9.42022L7.12988 9.62022V18.4602L7.27988 18.6102L10.4499 21.0602C10.8699 21.4802 11.8199 21.7102 12.4899 21.7102H16.3899C17.7299 21.7102 19.0799 20.7002 19.3799 19.4702L21.8399 11.9802C22.0999 11.2702 22.0299 10.5802 21.6499 10.0302Z"
                fill="#212B36"
              />
              <path
                d="M5.21 6.37988H4.18C2.63 6.37988 2 6.97988 2 8.45988V18.5199C2 19.9999 2.63 20.5999 4.18 20.5999H5.21C6.76 20.5999 7.39 19.9999 7.39 18.5199V8.45988C7.39 6.97988 6.76 6.37988 5.21 6.37988Z"
                fill="#212B36"
              />
            </svg>
          )}
        </div>
        <div
          className="btnActive"
          onClick={() => {
            if (like) {
              SetLike(!like);
            }
            SetDisLike(!disLike);
          }}
        >
          {!disLike ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M16.5197 5.6499L13.4197 3.2499C13.0197 2.8499 12.1197 2.6499 11.5197 2.6499H7.71973C6.51973 2.6499 5.21973 3.5499 4.91973 4.7499L2.51973 12.0499C2.01973 13.4499 2.91973 14.6499 4.41973 14.6499H8.41973C9.01973 14.6499 9.51973 15.1499 9.41973 15.8499L8.91973 19.0499C8.71973 19.9499 9.31973 20.9499 10.2197 21.2499C11.0197 21.5499 12.0197 21.1499 12.4197 20.5499L16.5197 14.4499"
                stroke="#212B36"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path
                d="M21.6196 5.65V15.45C21.6196 16.85 21.0196 17.35 19.6196 17.35H18.6196C17.2196 17.35 16.6196 16.85 16.6196 15.45V5.65C16.6196 4.25 17.2196 3.75 18.6196 3.75H19.6196C21.0196 3.75 21.6196 4.25 21.6196 5.65Z"
                stroke="#212B36"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M2.35002 13.9598C2.74002 14.5198 3.43002 14.8398 4.22002 14.8398H8.32002C8.59002 14.8398 8.84002 14.9498 9.01002 15.1498C9.19002 15.3498 9.26002 15.6298 9.22002 15.9198L8.71002 19.1998C8.49002 20.1798 9.14002 21.2798 10.12 21.6098C11.03 21.9498 12.1 21.4898 12.53 20.8398L16.74 14.5698L16.86 14.3698V5.52979L16.71 5.37979L13.54 2.92979C13.12 2.50979 12.17 2.27979 11.5 2.27979H7.60002C6.26002 2.27979 4.91002 3.28979 4.61002 4.51979L2.15002 12.0098C1.90002 12.7198 1.97002 13.4198 2.35002 13.9598Z"
                fill="#292D32"
              />
              <path
                d="M18.7899 17.6099H19.8199C21.3699 17.6099 21.9999 17.0099 21.9999 15.5299V5.4799C21.9999 3.9999 21.3699 3.3999 19.8199 3.3999H18.7899C17.2399 3.3999 16.6099 3.9999 16.6099 5.4799V15.5399C16.6099 17.0099 17.2399 17.6099 18.7899 17.6099Z"
                fill="#292D32"
              />
            </svg>
          )}
        </div>
        <div className="btnActive">
          <a href={StoreLink} target="blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
                stroke="#212B36"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.99983 22H14.9998C19.0198 22 19.7398 20.39 19.9498 18.43L20.6998 12.43C20.9698 9.99 20.2698 8 15.9998 8H7.99983C3.72983 8 3.02983 9.99 3.29983 12.43L4.04983 18.43C4.25983 20.39 4.97983 22 8.99983 22Z"
                stroke="#212B36"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity="0.4"
                d="M15.4955 12H15.5045"
                stroke="#212B36"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity="0.4"
                d="M8.49451 12H8.50349"
                stroke="#212B36"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <div className="btnActive" onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16.44 8.8999C20.04 9.2099 21.51 11.0599 21.51 15.1099V15.2399C21.51 19.7099 19.72 21.4999 15.25 21.4999H8.73998C4.26998 21.4999 2.47998 19.7099 2.47998 15.2399V15.1099C2.47998 11.0899 3.92998 9.2399 7.46998 8.9099"
              stroke="#212B36"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g opacity="0.4">
              <path
                d="M12 15.0001V3.62012"
                stroke="#212B36"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.3504 5.85L12.0004 2.5L8.65039 5.85"
                stroke="#212B36"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className={`shareCotainer ${active && "active_share"} mb-5 shareCotainerSix`}>
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
    </>
  );
};

export default ActiveBtns;
