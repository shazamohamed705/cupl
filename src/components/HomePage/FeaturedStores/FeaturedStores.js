import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { apiUtils } from '../../../services/apiService';
import './FeaturedStores.css';

const FeaturedStores = ({ stores, title }) => {
  const navigate = useNavigate();
  
  // Safe defaults
  const safeStores = stores || [];
  const safeTitle = title || 'المتاجر المميزة';

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const handleStoreClick = (store) => {
    const formattedStore = apiUtils.formatStoreData(store);
    navigate(`/${formattedStore.pageLink}`);
  };

  return (
    <section className="featured-stores-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{safeTitle}</h2>
          <p className="section-subtitle">
            اكتشف أفضل المتاجر مع العروض الحصرية
          </p>
        </motion.div>

        <motion.div 
          className="stores-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {safeStores.map((store, index) => {
            const formattedStore = apiUtils.formatStoreData(store);
            const hasCoupons = store.coupons && store.coupons.length > 0;
            
            return (
              <motion.div
                key={store.id}
                className="store-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                onClick={() => handleStoreClick(store)}
              >
                <div className="store-image-container">
                  {formattedStore.image ? (
                    <img 
                      src={formattedStore.image} 
                      alt={formattedStore.name}
                      className="store-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="store-placeholder">
                      <svg 
                        width="40" 
                        height="40" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9,22 9,12 15,12 15,22"/>
                      </svg>
                    </div>
                  )}
                  
                  {hasCoupons && (
                    <div className="coupon-badge">
                      <span>كوبون متاح</span>
                    </div>
                  )}
                </div>

                <div className="store-info">
                  <h3 className="store-name">{formattedStore.name}</h3>
                  
                  {formattedStore.category && (
                    <p className="store-category">
                      {formattedStore.category.name_en || formattedStore.category.name_ar}
                    </p>
                  )}

                  {hasCoupons && (
                    <div className="coupon-info">
                      <span className="coupon-count">
                        {store.coupons.length} كوبون
                      </span>
                      {store.coupons[0]?.discount_percentage && (
                        <span className="discount-percentage">
                          خصم {store.coupons[0].discount_percentage}%
                        </span>
                      )}
                    </div>
                  )}

                  <div className="store-actions">
                    <button className="visit-store-btn">
                      <span>زيارة المتجر</span>
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
                  </div>
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
            <span>عرض جميع المتاجر</span>
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

export default FeaturedStores;
