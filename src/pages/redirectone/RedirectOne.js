import React, { useContext, useEffect, useState } from "react";
import "./RedirectOne.css";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../contextApi/DataContext";
import { Helmet } from "react-helmet-async";
import ROneHead from "../../components/redirectOneComponents/roneHead/ROneHead";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
import GlobalFooterLinks from "../../components/GlobalFooterLinks";

const RedirectOne = () => {
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
  const { id } = useParams();
  const { data, setId, setLoading } = useContext(DataContext);

  // Get language from context or default to Arabic
  const language = data?.data?.language || 'ar';
  const isRTL = language === 'ar';
  
  // Enable global click redirect on redirect pages too
  const couponType = data?.data?.coupons?.type;
  const couponLink = data?.data?.coupons?.url || data?.data?.coupons?.link;
  useGlobalRedirectOnClick(couponType, couponLink);

  useEffect(() => {
    setId(id);
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const { host } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    data === "notFound" && navigate("*");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <>
      <Helmet>
        <title>
          {`${host}`} || {`${data?.data?.name_en}`}
        </title>
        <meta
          name="description"
          content={`Discover exclusive discounts at ${data?.data?.name_en}, your go-to destination for unbeatable savings! Browse a diverse range of categories, from fashion to electronics, and access verified coupons for top brands. Enjoy a seamless shopping experience with regularly updated deals. Subscribe to our newsletter for the latest promotions. Shop smart, save more at yalla coupon today!`}
        />
        <html dir={isRTL ? 'rtl' : 'ltr'} lang={language} />
      </Helmet>
      <main className={isRTL ? 'rtl' : 'ltr'}>
        <div className="topSvg">
          {isMobile ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="219"
              height="140"
              viewBox="0 0 219 140"
              fill="none"
            >
              <path
                d="M295.442 -359.528C364.678 -340.554 417.26 -289.195 450.017 -225.301C484.311 -158.408 502.636 -81.5252 473.493 -12.2318C442.454 61.567 376.843 117.316 298.675 134.543C220.681 151.731 138.998 127.376 78.9382 74.7211C21.7528 24.5861 -0.793064 -51.2326 0.0212293 -127.29C0.829465 -202.781 23.8841 -279.173 83.2266 -325.823C142.474 -372.4 222.765 -379.446 295.442 -359.528Z"
                fill="url(#paint0_radial_63_2488)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_63_2488"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(155.5 -21.5) rotate(61.2778) scale(184.159 223.307)"
                >
                  <stop stopColor="#4AA262" />
                  <stop offset="1" stopColor="#3A7E4C" />
                </radialGradient>
              </defs>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="354"
              height="269"
              viewBox="0 0 354 269"
              fill="none"
            >
              <path
                d="M295.442 -230.528C364.678 -211.554 417.26 -160.195 450.017 -96.3007C484.311 -29.4079 502.636 47.4748 473.493 116.768C442.454 190.567 376.843 246.316 298.675 263.543C220.681 280.731 138.998 256.376 78.9382 203.721C21.7528 153.586 -0.793064 77.7674 0.0212293 1.71028C0.829465 -73.7811 23.8841 -150.173 83.2266 -196.823C142.474 -243.4 222.765 -250.446 295.442 -230.528Z"
                fill="url(#paint0_radial_63_2459)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_63_2459"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(155.5 107.5) rotate(61.2778) scale(184.159 223.307)"
                >
                  <stop stopColor="#4AA262" />
                  <stop offset="1" stopColor="#3A7E4C" />
                </radialGradient>
              </defs>
            </svg>
          )}
        </div>
        <div className="center_svg">
          {isMobile ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="175"
              viewBox="0 0 52 175"
              fill="none"
            >
              <path
                d="M26.985 24.8334C45.8973 43.0092 53.5654 69.2008 51.7377 95.3345C49.9134 121.419 38.918 146.609 17.4219 161.571C-4.18077 176.608 -31.6233 177.824 -57.0829 171.08C-83.8281 163.997 -110.337 150.389 -120.989 124.911C-131.79 99.0777 -123.841 69.9402 -109.405 45.9385C-95.4339 22.7102 -73.2793 5.12747 -46.4454 0.975163C-19.682 -3.16623 7.48055 6.08853 26.985 24.8334Z"
                fill="url(#paint0_radial_63_2512)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_63_2512"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(0.249998 74.7863) rotate(110.39) scale(106.913 150.559)"
                >
                  <stop stopColor="#FFA07D" />
                  <stop offset="1" stopColor="#FF7D4C" />
                </radialGradient>
              </defs>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="162"
              height="351"
              viewBox="0 0 162 351"
              fill="none"
            >
              <path
                d="M111.97 49.8087C149.795 86.2641 165.131 138.797 161.475 191.214C157.827 243.532 135.836 294.055 92.8438 324.066C49.6385 354.225 -5.24667 356.664 -56.1658 343.138C-109.656 328.93 -162.674 301.637 -183.978 250.536C-205.58 198.722 -189.682 140.28 -160.81 92.1395C-132.868 45.5502 -88.5585 10.2842 -34.8907 1.9559C18.6359 -6.35054 72.9611 12.2118 111.97 49.8087Z"
                fill="url(#paint0_radial_63_2457)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_63_2457"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(58.5 150) rotate(110.337) scale(214.362 301.223)"
                >
                  <stop stopColor="#FFA07D" />
                  <stop offset="1" stopColor="#FF7D4C" />
                </radialGradient>
              </defs>
            </svg>
          )}
        </div>
        
        {/* Main redirect content container */}
        <div className="redirect-container">
          {/* Logo */}
          <div className="redirect-logo">
            {data?.data?.logo && (
              <img src={data.data.logo} alt={data?.data?.name_en || 'Logo'} />
            )}
          </div>
          
          {/* Title */}
          <h1 className="redirect-title">
            {isRTL 
              ? `خصم 60% على ${data?.data?.name_ar || 'نون'} الأصلية`
              : `60% Discount on ${data?.data?.name_en || 'Noon'} Originals`
            }
          </h1>
          
          {/* Description */}
          <p className="redirect-description">
            {isRTL 
              ? "استمتع باشراء مع كود خصم حصري توصيل مجاني لأول طلب"
              : "Enjoy shopping with an exclusive discount code free delivery for first order"
            }
          </p>
          
          {/* Coupon Code Box */}
          <div className="coupon-code-box">
            <p className="coupon-code">VX34</p>
          </div>
          
          {/* Copy Button */}
          <button 
            className="redirect-button"
            onClick={() => {
              navigator.clipboard.writeText('VX34');
            }}
          >
            {isRTL ? "انسخ الكود الآن" : "Copy Code Now"}
          </button>
          
          {/* Information Section */}
          <div className="info-section">
            <div className="info-item">
              <i className="ri-shield-check-line location"></i>
              <span>{isRTL ? "منتجات أصلية 100%" : "100% Original Products"}</span>
            </div>
            <div className="info-item">
              <i className="ri-truck-line discount"></i>
              <span>{isRTL ? "شحن مجاني لأول طلب" : "Free shipping for first order"}</span>
            </div>
            <div className="info-item">
              <i className="ri-time-line expiry"></i>
              <span>{isRTL ? "عرض فترة الإمارات فقط" : "UAE period offer only"}</span>
            </div>
          </div>
          
          {/* Shop Now Button */}
          <button 
            className="redirect-button"
            onClick={() => {
              if (couponLink) {
                window.open(couponLink, '_blank');
              }
            }}
            style={{ 
              background: '#000', 
              marginTop: '15px',
              width: '100%'
            }}
          >
            {isRTL ? `تسوق الآن من ${data?.data?.name_ar || 'نون'}` : `Shop now from ${data?.data?.name_en || 'Noon'}`}
          </button>
        </div>
        
        <ROneHead data={data?.data} />
      </main>
      <footer>
        <p>All right reserved © 2024</p>
        <GlobalFooterLinks className="links_footer" />
      </footer>
      <div className="bottomSvg bottomSvg_media">
        {isMobile ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="171"
            height="167"
            viewBox="0 0 171 167"
            fill="none"
          >
            <path
              d="M305.97 49.8087C343.795 86.2641 359.131 138.797 355.475 191.214C351.827 243.532 329.836 294.055 286.844 324.066C243.638 354.225 188.753 356.664 137.834 343.138C84.3439 328.93 31.3263 301.637 10.0221 250.536C-11.5801 198.722 4.31753 140.28 33.19 92.1395C61.1321 45.5502 105.441 10.2842 159.109 1.9559C212.636 -6.35054 266.961 12.2118 305.97 49.8087Z"
              fill="url(#paint0_radial_63_2513)"
            />
            <defs>
              <radialGradient
                id="paint0_radial_63_2513"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(252.5 150) rotate(110.337) scale(214.362 301.223)"
              >
                <stop stopColor="#FF7D7D" />
                <stop offset="1" stopColor="#FF4C4C" />
              </radialGradient>
            </defs>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="205"
            height="161"
            viewBox="0 0 205 161"
            fill="none"
          >
            <path
              d="M305.97 49.8087C343.795 86.2641 359.131 138.797 355.475 191.214C351.827 243.532 329.836 294.055 286.844 324.066C243.638 354.225 188.753 356.664 137.834 343.138C84.3439 328.93 31.3263 301.637 10.0221 250.536C-11.5801 198.722 4.31753 140.28 33.19 92.1395C61.1321 45.5502 105.441 10.2842 159.109 1.9559C212.636 -6.35054 266.961 12.2118 305.97 49.8087Z"
              fill="url(#paint0_radial_63_2458)"
            />
            <defs>
              <radialGradient
                id="paint0_radial_63_2458"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(252.5 150) rotate(110.337) scale(214.362 301.223)"
              >
                <stop stopColor="#FF7D7D" />
                <stop offset="1" stopColor="#FF4C4C" />
              </radialGradient>
            </defs>
          </svg>
        )}
      </div>
    </>
  );
};

export default RedirectOne;
