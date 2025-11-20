import React, { useContext, useEffect } from "react";
import "./CouponFive.css";
import { Helmet } from "react-helmet-async";
import { DataContext } from "../../contextApi/DataContext";
import HeaderFive from "../../components/couponFiveComponents/HeaderFive/HeaderFive";
import CopyFive from "../../components/couponFiveComponents/CopyFive/CopyFive";
import InfoFive from "../../components/couponFiveComponents/InfoFive/InfoFive";
import FooterFive from "../../components/couponFiveComponents/FooterFive/FooterFive";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
const CouponFive = () => {
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
        <>
          <main className={`couponFive_main ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="container">
              <HeaderFive data={data} />
              <CopyFive data={data} />
              <InfoFive data={data} />
            </div>
          </main>
          <FooterFive lang={language} />
        </>
      )}
    </>
  );
};

export default CouponFive;
