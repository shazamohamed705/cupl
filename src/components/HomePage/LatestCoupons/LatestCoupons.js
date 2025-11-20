import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { apiUtils } from '../../../services/apiService';
import './LatestCoupons.css';

const LatestCoupons = ({ coupons, title }) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const handleCouponClick = (coupon) => {
    const formattedCoupon = apiUtils.formatCouponData(coupon);
    if (formattedCoupon.store?.pageLink) {
      navigate(`/${formattedCoupon.store.pageLink}`);
    }
  };

  const copyCouponCode = (code, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code).then(() => {
      // You can add a toast notification here
      console.log('Coupon code copied:', code);
    });
  };

  return (
    <section className="latest-coupons-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{title}</h2>
         
        </motion.div>

        <motion.div 
          className="coupons-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {coupons.slice(0, 8).map((coupon, index) => {
            const formattedCoupon = apiUtils.formatCouponData(coupon);
            const store = formattedCoupon.store;
            
            return (
              <motion.div
                key={coupon.id}
                className="coupon-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                onClick={() => handleCouponClick(coupon)}
              >
                <div className="coupon-header">
                  <div className="store-info">
                    {store?.image && (
                      <img 
                        src={`https://coupon-lands.com/back-end/${store.image[0].url}`}
                        alt={store.name}
                        className="store-logo"
                        loading="lazy"
                      />
                    )}
                 
                  </div>
                  
                  {formattedCoupon.discountPercentage && (
                    <div className="discount-badge">
                      <span className="discount-text">
                        {formattedCoupon.discountPercentage}%
                      </span>
                     
                    </div>
                  )}
                </div>

                <div className="coupon-content">
                  <h4 className="coupon-title">
                    {formattedCoupon.title || 'عرض خاص'}
                  </h4>
                  
                  {formattedCoupon.description && (
                    <p className="coupon-description">
                      {formattedCoupon.description}
                    </p>
                  )}

                  {formattedCoupon.code && (
                    <div className="coupon-code-container">
                      <div className="coupon-code">
                        <span className="code-label">كود الخصم:</span>
                        <span className="code-value">{formattedCoupon.code}</span>
                      </div>
                      <button 
                        className="copy-btn"
                        onClick={(e) => copyCouponCode(formattedCoupon.code, e)}
                        title="نسخ الكود"
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                      </button>
                    </div>
                  )}

                  {formattedCoupon.countries && formattedCoupon.countries.length > 0 && (
                    <div className="countries-info">
                      <span className="countries-label">متاح في:</span>
                      <span className="countries-list">
                        {formattedCoupon.countries.map(country => 
                          country.name_en || country.name_ar
                        ).join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="coupon-footer">
                  <button className="use-coupon-btn">
                    <span>استخدم الكوبون</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </button>
                  
                  {formattedCoupon.timer && (
                    <div className="timer-info">
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <span>محدود الوقت</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="section-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button className="view-all-btn">
            <span>عرض جميع الكوبونات</span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestCoupons;
