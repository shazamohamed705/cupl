import React, { useContext, useEffect } from "react";
import "./RedirectThreePage.css";
import Footer from "../../components/coupontComponents/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../contextApi/DataContext";
import { Helmet } from "react-helmet-async";
import Rthree from "../../components/rthreeComponents/Rthree";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
import GlobalFooter from "../../components/GlobalFooter";
const RedirectThreePage = () => {
  const { id } = useParams();
  const { data, setId, host, setLoading } = useContext(DataContext);

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

  // console.log(host);
  // console.log(data);

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
      <header className="headerThree">
        <h1>{host}</h1>
      </header>
      <main className={`mainThree ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container">
          <Rthree data={data?.data} />
        </div>
      </main>
      {/* <Footer class={"footerThree"} /> */}
      <GlobalFooter variant="inline" language="ar" />
    </>
  );
};

export default RedirectThreePage;
