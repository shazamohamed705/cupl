import React from 'react'
import './LogoFour.css'
// import Logo from '../../../assets/images/logoFour.png'
const LogoFour = ({data}) => {
  return (
    <div className='LogoFour'>
        <img src={`https://coupon-lands.com/back-end/${data?.image[0]?.url}`} alt='logo'/>
    </div>
  )
}

export default LogoFour