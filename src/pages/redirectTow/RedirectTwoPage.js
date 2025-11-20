import React, { useContext, useEffect, useState } from "react";
import "./RedirectTwoPage.css";

import Footer from "../../components/coupontComponents/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../contextApi/DataContext";
import { Helmet } from "react-helmet-async";
import RedirectTow from "../../components/rtowComponents/RedirectTow";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
import GlobalFooter from "../../components/GlobalFooter";
const RedirectTwoPage = () => {
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
  const { data, setId, setLoading, host } = useContext(DataContext);

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
  const navigate = useNavigate();
  useEffect(() => {
    data === "notFound" && navigate("*");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <>
      <Helmet>
        <title>
          {host} || {`${data?.data?.name_en}`}
        </title>
        <meta
          name="description"
          content={`Discover exclusive discounts at ${data?.data?.name_en}, your go-to destination for unbeatable savings! Browse a diverse range of categories, from fashion to electronics, and access verified coupons for top brands. Enjoy a seamless shopping experience with regularly updated deals. Subscribe to our newsletter for the latest promotions. Shop smart, save more at yalla coupon today!`}
        />
        <html dir={isRTL ? 'rtl' : 'ltr'} lang={language} />
      </Helmet>
      <main className={`redirectTowMain ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className={`${isMobile ? "top_right_phone" : "top_right"}`}></div>
        <div
          className={`${isMobile ? "bottom_right_phone" : "bottom_right"}`}
        ></div>
        <div className={`${isMobile ? "top_left_phone" : "top_left"}`}></div>
        <div
          className={`${isMobile ? "bottom_left_phone" : "bottom_left"}`}
        ></div>
        <div className="container coupont">
          <div className="Coupon">
            <RedirectTow data={data?.data} />
          </div>
        </div>
      </main>
      <Footer class={"twoFooter"} />
      <GlobalFooter variant="inline" language="ar" />
    </>
  );
};

export default RedirectTwoPage;
