import React, { useContext } from 'react'
import './RedirectTow.css'
import { useNavigate, useParams } from 'react-router';
import { DataContext } from '../../contextApi/DataContext';
import Loader from '../../ui/Loader';

const RedirectTow = ({data}) => {
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
    //     !data &&
    //     navigate("*")
    //   },[data])
  return (
    <div className='RedirectTow'>
    <div className='RedirectTow_head'>
        <div className='RedirectTow_logo'>
            <img src={`https://coupon-lands.com/back-end/${data?.image[0]?.url}`} alt='logo'/>
        </div>
        <h1><span>{data?.coupons?.discount_percentage}%</span> Discount at {data?.name_en}</h1>
    </div>
    <p className='RedirectTow_pleaseConfirm'>please confirm you are not robot to get code</p>
    <button className='RedirectTow_RobotBtn'onClick={navigateToLink} disabled={loading}>
          {!loading ? "I,m not A Robot" : <Loader className="spinner" />} 
            
          </button>
    <div className='RedirectTow_info'>
        <span className='RedirectTow_checkSpamTitle'>this page is for chaking spam</span>
        <p className='RedirectTow_notrobottitle'>click “I’m not A robot” </p>
    </div>
</div>
  )
}

export default RedirectTow