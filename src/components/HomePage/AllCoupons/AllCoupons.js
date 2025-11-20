import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { homepageAPI } from '../../../services/apiService';
import './AllCoupons.css';

const AllCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await homepageAPI.getLatestCoupons();
      if (response && response.success && response.data) {
        setCoupons(response.data);
        // Extract unique countries
        const uniqueCountries = [...new Set(
          response.data.flatMap(coupon => 
            (coupon.countries || []).map(country => ({
              id: country.id,
              name: country.name_ar || country.name_en,
              flag: country.flag
            }))
          )
        )];
        setCountries(uniqueCountries);
      } else {
        setCoupons([]);
        setCountries([]);
      }
    } catch (err) {
      console.error('Error fetching coupons:', err);
      setCoupons([]);
      setCountries([]);
      setError('فشل في تحميل الكوبونات');
    } finally {
      setLoading(false);
    }
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.store?.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.store?.name_en?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = !selectedCountry || 
                          coupon.countries.some(country => country.id.toString() === selectedCountry);
    
    return matchesSearch && matchesCountry;
  });

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      // You can add a toast notification here
      console.log('Code copied to clipboard');
    });
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="all-coupons-loading">
        <div className="loading-spinner"></div>
        <p>جاري تحميل الكوبونات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-coupons-error">
        <p>{error}</p>
        <button onClick={fetchCoupons} className="retry-btn">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <section className="all-coupons-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>جميع الكوبونات المتاحة</h2>
   
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="coupons-filters"
        >
       
        </motion.div>

        {/* Coupons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="coupons-grid"
        >
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => (
              <motion.div
                key={coupon.id}
                variants={itemVariants}
                className="coupon-card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="coupon-header">
                  <div className="store-info">
                    {coupon.store?.image?.[0]?.url ? (
                      <img
                        src={`https://coupon-lands.com/back-end/${coupon.store.image[0].url}`}
                        alt={coupon.store.name_ar || coupon.store.name_en}
                        className="store-logo"
                        onError={(e) => {
                          console.error('Image failed to load:', e.target.src);
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="store-logo-placeholder">
                        {coupon.store?.name_ar?.charAt(0) || coupon.store?.name_en?.charAt(0) || 'S'}
                      </div>
                    )}

                  </div>
                  {coupon.discount_percentage && (
                    <div className="discount-badge">
                      {coupon.discount_percentage}% خصم
                    </div>
                  )}
                </div>

                <div className="coupon-body">
                  {coupon.description_ar && (
                    <p className="coupon-description">{coupon.description_ar}</p>
                  )}
                  
                  <div className="coupon-code">
                    <span className="code-label">كود الخصم:</span>
                    <div className="code-container">
                      <span className="code-text">{coupon.code}</span>
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        className="copy-btn"
                        title="نسخ الكود"
                      >
                        <i className="fas fa-copy"></i>
                      </button>
                    </div>
                  </div>

                  <div className="countries">
                    <span className="countries-label">متاح في:</span>
                    <div className="countries-flags">
                      {coupon.countries.slice(0, 5).map(country => (
                        <span key={country.id} className="country-flag" title={country.name_ar}>
                          {country.flag}
                        </span>
                      ))}
                      {coupon.countries.length > 5 && (
                        <span className="more-countries">+{coupon.countries.length - 5}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="coupon-footer">
                  <button
                    onClick={() => window.open(coupon.link, '_blank')}
                    className="use-coupon-btn"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    استخدم الكوبون
                  </button>
                  <div className="coupon-timer">
                    <i className="fas fa-clock"></i>
                    {coupon.timer} يوم متبقي
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-coupons">
              <i className="fas fa-search"></i>
              <p>لم يتم العثور على كوبونات تطابق البحث</p>
            </div>
          )}
        </motion.div>
    
      </div>
    </section>
  );
};

export default AllCoupons;
