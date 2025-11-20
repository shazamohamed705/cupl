import React from 'react'
import './ShareFour.css'
import {
    FacebookMessengerShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
const ShareFour = ({data}) => {

  const couponCode = data?.data?.coupons?.code;
  const couponLink = data?.data?.coupons?.link;
  const StoreLink = data?.language?.link;
  const shareUrl =
   couponCode
    ? 
    `Coupon code: ${couponCode}. Store link: ${couponLink ?? StoreLink}`
    : StoreLink;
  return (
    <div className='ShareFour container'>
        <h4>شارك الكود علي</h4>
        <div className='ShareFour_btns'>
        <FacebookShareButton url={shareUrl}>
          <i className="ri-facebook-circle-fill" />
        </FacebookShareButton >
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
  )
}

export default ShareFour