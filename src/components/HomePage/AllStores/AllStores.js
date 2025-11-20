import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { homepageAPI } from '../../../services/apiService';
import './AllStores.css';

const AllStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await homepageAPI.getFeaturedStores();
      if (response && response.success && response.data) {
        setStores(response.data);
        // Extract unique categories
        const uniqueCategories = [...new Set(
          response.data
            .map(store => store.category)
            .filter(category => category)
            .map(category => ({
              id: category.id,
              name: category.name_ar || category.name_en
            }))
        )];
        setCategories(uniqueCategories);
      } else {
        setStores([]);
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching stores:', err);
      setStores([]);
      setCategories([]);
      setError('فشل في تحميل المتاجر');
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.name_en?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
                           (store.category && store.category.id.toString() === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

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
      <div className="all-stores-loading">
        <div className="loading-spinner"></div>
        <p>جاري تحميل المتاجر...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-stores-error">
        <p>{error}</p>
        <button onClick={fetchStores} className="retry-btn">
          إعادة المحاولة
        </button>
      </div>
    );
  }

//   return (
//     <section className="all-stores-section">
//       <div className="container">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="section-header"
//         >
//           <h2>جميع المتاجر المتاحة</h2>
//           <p>اكتشف مئات المتاجر الموثوقة مع أفضل العروض والخصومات</p>
//           <div className="section-description">
//             <p>
//               نقدم لك مجموعة شاملة من المتاجر المحلية والعالمية مع ضمان جودة الخدمة. 
//               كل متجر يتم فحصه بعناية لضمان حصولك على أفضل تجربة تسوق.
//             </p>
//           </div>
//         </motion.div>

//         {/* Search and Filter */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="stores-filters"
//         >
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="ابحث عن متجر..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//             <i className="fas fa-search search-icon"></i>
//           </div>
          
//           <div className="category-filter">
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="category-select"
//             >
//               <option value="">جميع الفئات</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </motion.div>

//         {/* Stores Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="stores-grid"
//         >
//           {filteredStores.length > 0 ? (
//             filteredStores.map((store) => (
//               <motion.div
//                 key={store.id}
//                 variants={itemVariants}
//                 className="store-card"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <div className="store-header">
//                   {store.image?.[0]?.url ? (
//                     <img
//                       src={`https://coupon-lands.com/back-end/${store.image[0].url}`}
//                       alt={store.name_ar || store.name_en}
//                       className="store-logo"
//                       onError={(e) => {
//                         console.error('Image failed to load:', e.target.src);
//                         e.target.style.display = 'none';
//                       }}
//                     />
//                   ) : (
//                     <div className="store-logo-placeholder">
//                       {store.name_ar?.charAt(0) || store.name_en?.charAt(0) || 'S'}
//                     </div>
//                   )}
//                   <div className="store-info">
//                     <h3>{store.name_ar || store.name_en}</h3>
//                     {store.category && (
//                       <span className="store-category">
//                         {store.category.name_ar || store.category.name_en}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="store-body">
//                   <div className="store-stats">
//                     <div className="stat-item">
//                       <i className="fas fa-tags"></i>
//                       <span>{store.coupons?.length || 0} كوبون</span>
//                     </div>
//                     <div className="stat-item">
//                       <i className="fas fa-star"></i>
//                       <span>مميز</span>
//                     </div>
//                   </div>

//                   {store.coupons && store.coupons.length > 0 && (
//                     <div className="featured-coupons">
//                       <h4>أحدث الكوبونات:</h4>
//                       <div className="coupons-list">
//                         {store.coupons.slice(0, 3).map((coupon, index) => (
//                           <div key={index} className="coupon-item">
//                             <span className="coupon-code">{coupon.code}</span>
//                             {coupon.discount_percentage && (
//                               <span className="discount-percentage">
//                                 {coupon.discount_percentage}%
//                               </span>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="store-footer">
//                   <button
//                     onClick={() => window.open(store.link_ar || store.link_en, '_blank')}
//                     className="visit-store-btn"
//                   >
//                     <i className="fas fa-external-link-alt"></i>
//                     زيارة المتجر
//                   </button>
//                   <button
//                     onClick={() => window.location.href = `/store/${store.page_link}`}
//                     className="view-coupons-btn"
//                   >
//                     <i className="fas fa-tags"></i>
//                     عرض الكوبونات
//                   </button>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <div className="no-stores">
//               <i className="fas fa-store"></i>
//               <p>لم يتم العثور على متاجر تطابق البحث</p>
//             </div>
//           )}
//         </motion.div>

//         {filteredStores.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="stores-stats"
//           >
//             <p>عرض {filteredStores.length} من {stores.length} متجر</p>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
};

export default AllStores;
