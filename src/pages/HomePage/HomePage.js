import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import './HomePage.css';

// Import components
import HeroSection from '../../components/HomePage/HeroSection/HeroSection';
import FeaturedStores from '../../components/HomePage/FeaturedStores/FeaturedStores';
import LatestCoupons from '../../components/HomePage/LatestCoupons/LatestCoupons';
import CategoriesSection from '../../components/HomePage/CategoriesSection/CategoriesSection';
import StatsSection from '../../components/HomePage/StatsSection/StatsSection';
import AllCoupons from '../../components/HomePage/AllCoupons/AllCoupons';
import AllStores from '../../components/HomePage/AllStores/AllStores';
import GlobalFooter from '../../components/GlobalFooter';
import SearchBar from '../../components/HomePage/SearchBar/SearchBar';
import Loader from '../../ui/Loader';

// Import API service
import { homepageAPI } from '../../services/apiService';

const HomePage = () => {
  const [homepageData, setHomepageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Set default data first to ensure page renders
      const defaultData = {
        domain: null,
        featured_stores: [],
        latest_coupons: [],
        categories: [],
        stats: {
          total_stores: 0,
          total_coupons: 0,
          total_categories: 0,
          featured_coupons: 0
        }
      };
      
      setHomepageData(defaultData);
      
      const response = await homepageAPI.getHomepageData();
      
      if (response && response.success && response.data) {
        setHomepageData(response.data);
        console.log('Homepage data loaded successfully:', response.data);
      } else {
        console.warn('No homepage data received, using default data');
        // Keep default data that was already set
      }
    } catch (err) {
      console.error('Error fetching homepage data:', err);
      // Keep default data that was already set
      setError('فشل في تحميل البيانات من الخادم');
      toast.error('حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchHomepageData();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>حدث خطأ في تحميل الصفحة</h2>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-btn">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // Remove this check since we now provide default data

  const {
    domain,
    featured_stores = [],
    latest_coupons = [],
    categories = [],
    stats = {
      total_stores: 0,
      total_coupons: 0,
      total_categories: 0,
      featured_coupons: 0
    }
  } = homepageData || {};

  return (
    <>
      <Helmet>
        <title>{domain?.name || 'Coupon Lands'} - الصفحة الرئيسية</title>
        <meta 
          name="description" 
          content={`اكتشف أفضل العروض والكوبونات في ${domain?.name || 'Coupon Lands'}. متاجر مميزة، كوبونات حصرية، وعروض لا تفوت!`} 
        />
        <meta name="keywords" content="كوبونات, عروض, خصومات, متاجر, تسوق" />
      </Helmet>

      <div className="homepage">
        {/* Hero Section */}
        <HeroSection 
          domain={domain}
          stats={stats}
        />

        {/* Featured Stores Section */}
        {featured_stores && featured_stores.length > 0 && (
          <FeaturedStores 
            stores={featured_stores}
            title="المتاجر المميزة"
          />
        )}

        {/* Categories Section */}
        {categories && categories.length > 0 && (
          <CategoriesSection 
            categories={categories}
            title="التصنيفات الشائعة"
          />
        )}

        {/* Latest Coupons Section */}
        {latest_coupons && latest_coupons.length > 0 && (
          <LatestCoupons 
            coupons={latest_coupons}
            title="أحدث الكوبونات"
          />
        )}

        {/* Stats Section */}
        {stats && (
          <StatsSection 
            stats={stats}
          />
        )}

        {/* Search Bar */}
        <SearchBar />

        {/* All Coupons Section */}
        <AllCoupons />

        {/* All Stores Section */}
        <AllStores />

        {/* Global Footer */}
        <GlobalFooter 
          variant="inline"
          language="ar"
        />
      </div>
    </>
  );
};

export default HomePage;
