import React, { useContext } from "react";
import "./Rfour.css";
import { useNavigate, useParams } from "react-router";
import Loader from "../../ui/Loader";
import { DataContext } from "../../contextApi/DataContext";
const Rfour = ({ data }) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {loading,setLoading} = useContext(DataContext)
    const navigateToLink = () => {
      setLoading(true)
      setTimeout(() => {
          // setLoading(false);
           navigate(`/coupon/${id}`);
          }, 1000)
  };
    // useEffect(()=>{
    //   !data &&
    //   navigate("*")
    // },[data])
    // const store = data?.language?.store;
    const description = data?.language?.coupons;
    const discountPercentage = data?.data?.coupons?.discount_percentage;
  return (
      <div className="ContentFour container Rfour">
        {
          discountPercentage &&
        <span className="offer">خصم {discountPercentage}%</span>
        }
        <div className="ContentFour_content">
          <div className="ContentFour_content_header">
            <h1>
              {description}
            </h1>
            <p className="Rfour_confirmTitle">
              please confirm you are not robot to get code
            </p>
          </div>
          <button className="RedirectTow_RobotBtn Rfour_btn " onClick={navigateToLink} disabled={loading}>
          {!loading ? "I,m not A Robot" : <Loader className="spinner" />} 
            
          </button>
          <div className="RedirectTow_info">
            <span className="RedirectTow_checkSpamTitle Rfour_span">
              this page is for chaking spam
            </span>
            <p className="RedirectTow_notrobottitle">
              click “I’m not A robot”{" "}
            </p>
          </div>
        </div>
      </div>
  );
};

export default Rfour;
