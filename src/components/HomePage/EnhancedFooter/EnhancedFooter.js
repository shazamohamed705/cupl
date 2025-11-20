import React from 'react';
import { motion } from 'framer-motion';
import './EnhancedFooter.css';

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    categories: [
      { name: 'الموضة والأزياء', link: '/category/fashion' },
      { name: 'الإلكترونيات', link: '/category/electronics' },
      { name: 'المنزل والحديقة', link: '/category/home' },
      { name: 'الرياضة واللياقة', link: '/category/sports' },
      { name: 'الجمال والعناية', link: '/category/beauty' },
      { name: 'الطعام والمشروبات', link: '/category/food' }
    ],
    stores: [
      { name: 'أمازون', link: '/store/amazon' },
      { name: 'نون', link: '/store/noon' },
      { name: 'سوق', link: '/store/souq' },
      { name: 'نمشي', link: '/store/namshi' },
      { name: '6 ستريت', link: '/store/6thstreet' },
      { name: 'جميع المتاجر', link: '/stores' }
    ],
    support: [
      { name: 'مركز المساعدة', link: '/help' },
      { name: 'اتصل بنا', link: '/contact' },
      { name: 'الأسئلة الشائعة', link: '/faq' },
      { name: 'سياسة الخصوصية', link: '/privacy' },
      { name: 'شروط الاستخدام', link: '/terms' },
      { name: 'الإبلاغ عن مشكلة', link: '/report' }
    ],
    social: [
      { name: 'تويتر', icon: 'fab fa-twitter', link: '#' },
      { name: 'فيسبوك', icon: 'fab fa-facebook', link: '#' },
      { name: 'إنستغرام', icon: 'fab fa-instagram', link: '#' },
      { name: 'يوتيوب', icon: 'fab fa-youtube', link: '#' },
      { name: 'تيليجرام', icon: 'fab fa-telegram', link: '#' }
    ]
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

  return (
    <footer className="enhanced-footer">
      <div className="container">
        {/* Main Footer Content */}
       

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="footer-bottom"
        >
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Coupon Lands. جميع الحقوق محفوظة.</p>
            </div>
       
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
