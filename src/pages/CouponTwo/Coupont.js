import React, { useContext, useEffect, useState } from "react";
import "./Coupont.css";
import HeadCoupon from "../../components/coupontComponents/HeadTitle/HeadCoupon";
import CopyPart from "../../components/coupontComponents/copySection/CopyPart";
import CoupounTInfo from "../../components/coupontComponents/CouponTInfo/CouponTInfo";
import Footer from "../../components/coupontComponents/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../contextApi/DataContext";
import { Helmet } from "react-helmet-async";
import TimerTwo from "../../components/coupontComponents/timer_tow/TimerTwo";
import NotFound from "../not-found/NotFound";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
import GlobalFooter from "../../components/GlobalFooter";
const Coupont = () => {
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
  const { data, setId, host } = useContext(DataContext);
  const { loading } = useContext(DataContext);
  const navigate = useNavigate();

  // Get language from context or default to Arabic
  const language = data?.data?.language || 'ar';
  const isRTL = language === 'ar';

  // Global redirect on click when coupon is link or code
  const couponType = data?.data?.coupons?.type;
  const couponLink = data?.data?.coupons?.url || data?.data?.coupons?.link;
  useGlobalRedirectOnClick(couponType, couponLink);
  useEffect(() => {
    setId(id);
    if (!loading && data?.data?.coupons?.fake_page === 1) {
      navigate(`/${id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // useEffect(() => {
  //   data === "notFound" && navigate("*");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);
  return (
    <>
      {!data || (data === "notFound" && !loading && <NotFound />)}
      <Helmet>
        <title>
          {host ?? ""} || {`${data?.data?.name_en}`}
        </title>
        <meta
          name="description"
          content={`Discover exclusive discounts at ${data?.data?.name_en}, your go-to destination for unbeatable savings! Browse a diverse range of categories, from fashion to electronics, and access verified coupons for top brands. Enjoy a seamless shopping experience with regularly updated deals. Subscribe to our newsletter for the latest promotions. Shop smart, save more at yalla coupon today!`}
        />
        <html dir={isRTL ? 'rtl' : 'ltr'} lang={language} />
      </Helmet>
      {data && data !== "notFound" && (
        <main className={isRTL ? 'rtl' : 'ltr'}>
          <div
            className={`${isMobile ? "top_right_phone" : "top_right"}`}
          ></div>
          <div
            className={`${isMobile ? "bottom_right_phone" : "bottom_right"}`}
          ></div>
          <div className={`${isMobile ? "top_left_phone" : "top_left"}`}></div>
          <div
            className={`${isMobile ? "bottom_left_phone" : "bottom_left"}`}
          ></div>
          <div className="container coupont">
            <div className="Coupon">
              <HeadCoupon data={data} />
              <TimerTwo />
              <CopyPart data={data} />
              <CoupounTInfo data={data} />
            </div>
          </div>
        </main>
      )}
      {/* <Footer class={"twoFooter"} /> */}
      <GlobalFooter variant="inline" language="ar" />
    </>
  );
};

export default Coupont;
