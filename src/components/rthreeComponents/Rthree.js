import React, { useContext } from "react";
import "./Rthree.css";
import { useNavigate, useParams } from "react-router";
import Loader from "../../ui/Loader";
import { DataContext } from "../../contextApi/DataContext";
const Rthree = ({ data }) => {
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
    // console.log(data);

  return (
    <div className="Rthree">
      <div className="Rthree_title">
        <div className="Rthree_img">
          <img
            src={`https://coupon-lands.com/back-end/${data?.image[0]?.url}`}
            alt="logo"
          />
          <span>{data?.coupons?.discount_percentage}%OFF</span>
        </div>
        <h2>
          {data?.name_en} discount code <br />{" "}
          {data?.coupons?.discount_percentage}% sale
        </h2>
      </div>
      <p className="RedirectTow_pleaseConfirm">
        please confirm you are not robot to get code
      </p>
      <button className="RedirectTow_RobotBtn" onClick={navigateToLink} disabled={loading}>
          {!loading ? "I,m not A Robot" : <Loader className="spinner" />} 
            
          </button>
      <div className="RedirectTow_info">
        <span className="RedirectTow_checkSpamTitle">
          this page is for chaking spam
        </span>
        <p className="RedirectTow_notrobottitle">click “I’m not A robot” </p>
      </div>
    </div>
  );
};

export default Rthree;
