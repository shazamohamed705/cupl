import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../assets/Animation - 1708327842100.json";
import './Home.css'
import { DataContext } from '../../contextApi/DataContext';
const Home = () => {
  const {host} = useContext(DataContext);
  const options = {
    animationData: groovyWalkAnimation,
    loop: true
  };
  const { View } = useLottie(options);
    <Helmet>
        <title>{`${host}`} || Home</title>
        <meta name="description" content={`Discover exclusive discounts at ${host}, your go-to destination for unbeatable savings! Browse a diverse range of categories, from fashion to electronics, and access verified coupons for top brands. Enjoy a seamless shopping experience with regularly updated deals. Subscribe to our newsletter for the latest promotions. Shop smart, save more at yalla coupon today!`}/>
    </Helmet> 
  return (
    <div className='home container'>
      {View}
    </div>
  )
} 

export default Home