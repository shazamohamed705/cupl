import React, { useContext, useEffect } from "react";
import "./CouponThree.css";
import Footer from "../../components/coupontComponents/footer/Footer";
import HeadThree from "../../components/couponThreeC/HeadTitle/HeadThree";
import ThreeCopy from "../../components/couponThreeC/ThreeCopy/ThreeCopy";
import ThreeInfo from "../../components/couponThreeC/ThreeInfo/ThreeInfo";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../contextApi/DataContext";
import { Helmet } from "react-helmet-async";
import NotFound from "../not-found/NotFound";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
import GlobalFooter from "../../components/GlobalFooter";

const CouponThree = () => {
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
  return (<>
      {!data || (data === "notFound" && !loading && <NotFound />)}
      <Helmet>
        <title>{host ?? ""} || {`${data?.data?.name_en}`}</title>
        <meta name="description" content={`Discover exclusive discounts at ${data?.data?.name_en}, your go-to destination for unbeatable savings! Browse a diverse range of categories, from fashion to electronics, and access verified coupons for top brands. Enjoy a seamless shopping experience with regularly updated deals. Subscribe to our newsletter for the latest promotions. Shop smart, save more at yalla coupon today!`}/>
        <html dir={isRTL ? 'rtl' : 'ltr'} lang={language} />
      </Helmet>
      <header className="headerThree">
        <h1>{host}</h1>
      </header>
      {data && data !== "notFound" && (
        <main className={`mainThree ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="container">
            <HeadThree data={data} />
            <ThreeInfo data={data} />
            <ThreeCopy data={data} />
          </div>
        </main>
      )}
      {/*  <Footer class={"footerThree"} lang={language} /> */}
      <GlobalFooter variant="inline" language={language} />
    </>
  );
};

export default CouponThree;
