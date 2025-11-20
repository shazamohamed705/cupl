import React, { useContext, useEffect, lazy, Suspense, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../contextApi/DataContext";
import { Helmet } from "react-helmet-async";
import NotFound from "../not-found/NotFound";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
import Loader from "../../ui/Loader";
import "./CouponFour.css";
// Lazy-load heavy components to reduce initial bundle size
const LogoFour = lazy(() => import("../../components/couponFourC/LogoFour/LogoFour"));
const ContentFour = lazy(() => import("../../components/couponFourC/ContentFour/ContentFour"));
const CouponLocation = lazy(() => import("../../components/couponFourC/CouponLocation/CouponLocation"));
const ShareFour = lazy(() => import("../../components/couponFourC/shareFour/ShareFour"));
const GlobalFooter = lazy(() => import("../../components/GlobalFooter"));
const CouponFour = () => {
  const { id } = useParams();
  const { data, setId, host, loading } = useContext(DataContext);
  const navigate = useNavigate();

  // Derive language and RTL once using memo for stability and perf
  const language = useMemo(() => data?.data?.language || "ar", [data]);
  const isRTL = language === "ar";
  
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

  // Fast-fail rendering: NotFound, Loading, or Content
  if (!loading && data === "notFound") {
    return <NotFound />;
  }

  const storeName = isRTL ? (data?.data?.name_ar || data?.data?.name_en || "Coupon Store") : (data?.data?.name_en || data?.data?.name_ar || "Coupon Store");
  const pageTitle = `${storeName} | ${host || "Yalla Coupon"}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Explore verified coupons and deals for ${storeName}. Save more with updated promotions across categories. Shop smart on ${host || "Yalla Coupon"}.`}
        />
        <html dir={isRTL ? "rtl" : "ltr"} lang={language} />
      </Helmet>
      <Suspense
        fallback={
          <div className={`CouponFour_main ${isRTL ? "rtl" : "ltr"}`}>
            <div className="CouponFour_container container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
              {/* Centered loader while lazy chunks load */}
              <Loader />
            </div>
          </div>
        }
      >
        {data && data !== "notFound" ? (
          <main className={`CouponFour_main ${isRTL ? "rtl" : "ltr"}`}>
            <div className="CouponFour_container container">
              <LogoFour data={data?.data} />
              <ContentFour data={data} />
              <CouponLocation data={data} />
              <ShareFour data={data} />
            </div>
          </main>
        ) : (
          <main className={`CouponFour_main ${isRTL ? "rtl" : "ltr"}`}>
            <div className="CouponFour_container container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
              <Loader />
            </div>
          </main>
        )}
        <GlobalFooter variant="inline" language={language} />
      </Suspense>
    </>
  );
};

export default CouponFour;
