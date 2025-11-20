import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../contextApi/DataContext";
import { Helmet } from "react-helmet-async";
import NotFound from "../not-found/NotFound";
import LogoFour from "../../components/couponFourC/LogoFour/LogoFour";
import ContentFour from "../../components/couponFourC/ContentFour/ContentFour";
import CouponLocation from "../../components/couponFourC/CouponLocation/CouponLocation";
import ShareFour from "../../components/couponFourC/shareFour/ShareFour";
import Footer from "../../components/coupontComponents/footer/Footer";
import "./CouponSix.css";
import HeaderSix from "../../components/couponSixComponents/headerSix/HeaderSix";
import ContentSix from "../../components/couponSixComponents/contentSix/ContentSix";
import TimerSix from "../../components/couponSixComponents/timerSix/TimerSix";
import CopyInputSix from "../../components/couponSixComponents/CopyInputSix/CopyInputSix";
import ActiveBtns from "../../components/couponSixComponents/activeBtns/ActiveBtns";
import InfoSix from "../../components/couponSixComponents/infoSix/InfoSix";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
import GlobalFooter from "../../components/GlobalFooter";
const CouponSix = () => {
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
  //   data === "notFound" && navigate("/*");
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
        <main className={`CouponSix_main ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="container">
            <HeaderSix data={data?.data} />
            <ContentSix data={data} />
            <TimerSix data={data} />
            <CopyInputSix data={data} />
            <ActiveBtns data={data} />
            <InfoSix data={data} />
          </div>
        </main>
      )}
      <Footer class={"footerSix"} lang={language} />
      <GlobalFooter variant="inline" language={language} />
    </>
  );
};

export default CouponSix;
