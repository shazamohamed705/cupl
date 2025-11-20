import React, { useContext } from 'react'
import './ROneHead.css'
import { useNavigate, useParams } from 'react-router';
import { DataContext } from '../../../contextApi/DataContext';
import Loader from '../../../ui/Loader';
const ROneHead = ({data}) => {
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
  return (
    <div className='ROneHead'>
        <div className='ROneHead_logo'>
            <img src={`https://coupon-lands.com/back-end/${data?.image[0]?.url}`} alt='logo'/>
        </div>
        <h1>{data?.coupons?.discount_percentage}% Discount at {data?.name_en}</h1>
        <p className='pleaseConfirm'>please confirm you are not robot to get code</p>
        <button className='RobotBtn' onClick={navigateToLink} disabled={loading}>
          {!loading ? "I,m not A Robot" : <Loader className="spinner" />} 
            
          </button>
        <span className='checkSpamTitle'>this page is for chaking spam</span>
        <p className='notrobottitle'>click “I’m not A robot” </p>
    </div>
  )
}

export default ROneHead