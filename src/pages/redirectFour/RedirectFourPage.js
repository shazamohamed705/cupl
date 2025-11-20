import React, { useContext, useEffect } from "react";
import "./RedirectFourPage.css";
import LogoFour from "../../components/couponFourC/LogoFour/LogoFour";
import Footer from "../../components/coupontComponents/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../contextApi/DataContext";
import { Helmet } from "react-helmet-async";
import Rfour from "../../components/rfourComponents/Rfour";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
import GlobalFooter from "../../components/GlobalFooter";

const RedirectFourPage = () => {
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

  useEffect(() => {
    const savedTimestamp = localStorage.getItem("timestamp");
    const currentTimestamp = new Date().getTime();

    if (!savedTimestamp) {
      // Save the current timestamp if none exists
      localStorage.setItem("timestamp", currentTimestamp.toString());
    } else {
      // Load the saved timestamp and calculate initial counter values
      const storedTime = parseInt(savedTimestamp);
      const now = new Date().getTime();
      const elapsedTime = now - storedTime;
      const destination =
        storedTime + data?.data?.coupons?.timer * 60 * 60 * 1000; // 6 hours

      if (elapsedTime < 0 || destination < now) {
        // Reset if expired or timestamp is invalid
        localStorage.removeItem("timestamp");
        return;
      }

      // Start interval immediately to ensure continuity
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const remainingTime = destination - now;

        if (remainingTime <= 0) {
          clearInterval(intervalId);
          // Handle the end state appropriately
        }
      }, 1000);

      // Clean up the interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [data]);
  return (
<>
      <Helmet>
        <title>{`${host}`} || {`${data?.data?.name_en}`}</title>
        <meta
          name="description"
          content={`Discover exclusive discounts at ${data?.data?.name_en}, your go-to destination for unbeatable savings! Browse a diverse range of categories, from fashion to electronics, and access verified coupons for top brands. Enjoy a seamless shopping experience with regularly updated deals. Subscribe to our newsletter for the latest promotions. Shop smart, save more at yalla coupon today!`}
        />
        <html dir={isRTL ? 'rtl' : 'ltr'} lang={language} />
      </Helmet>

      <main className={`CouponFour_main ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="CouponFour_container container">
          <LogoFour data={data} />
          <Rfour data={data} />
          <Footer class={"footer_four"} />
        </div>
      </main>
      <GlobalFooter variant="inline" language="ar" />
    </>
  );
};

export default RedirectFourPage;
