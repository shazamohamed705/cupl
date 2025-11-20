import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = ({ domain, stats }) => {
  // Function to extract domain name only (without http/https)
  const getDomainName = (domainObj) => {
    if (!domainObj || !domainObj.name) return 'Coupon Lands';
    
    let domainName = domainObj.name;
    
    // Remove http:// or https:// if present
    domainName = domainName.replace(/^https?:\/\//, '');
    
    // Remove www. if present
    domainName = domainName.replace(/^www\./, '');
    
    // Remove trailing slash if present
    domainName = domainName.replace(/\/$/, '');
    
    return domainName;
  };

  // Safe defaults
  const safeDomain = domain || { name: 'Coupon Lands' };
  const domainName = getDomainName(safeDomain);
  const safeStats = stats || {
    total_stores: 0,
    total_coupons: 0,
    total_categories: 0,
    featured_coupons: 0
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text" variants={itemVariants}>
            <h1 className="hero-title">
              مرحباً بك في{' '}
              <span className="highlight">
                {domainName}
              </span>
            </h1>
            <p className="hero-subtitle">
              اكتشف أفضل العروض والكوبونات الحصرية من آلاف المتاجر
              <br />
              ووفر المال مع كل عملية شراء
            </p>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
