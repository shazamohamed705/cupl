import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DataContext } from "../../contextApi/DataContext";
import NotFound from "../not-found/NotFound";
const DefaultPage = () => {
  const { id } = useParams();
  const { data, setId, host } = useContext(DataContext);
  const { loading } = useContext(DataContext);
  const navigate = useNavigate();
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
  // }, [data, navigate]);

  return (
    <>
      {!data || (data === "notFound" && !loading && <NotFound />)}
      <Helmet>
        <title>
          {host ?? "yalla Coupon"} || {`${data?.data?.name_en}`}
        </title>
        <meta
          name="description"
          content={`Discover exclusive discounts at ${data?.data?.name_en}, your go-to destination for unbeatable savings! Browse a diverse range of categories, from fashion to electronics, and access verified coupons for top brands. Enjoy a seamless shopping experience with regularly updated deals. Subscribe to our newsletter for the latest promotions. Shop smart, save more at yalla coupon today!`}
        />
      </Helmet>
      {loading && ""}
    </>
  );
};

export default DefaultPage;
