import React, { useContext } from 'react';
import { DataContext } from '../contextApi/DataContext';
import usePages from '../hooks/usePages';
import './GlobalFooterLinks.css';

/**
 * Global footer links component that fetches and displays pages from API
 * @param {Object} props - Component props
 * @param {string} props.className - CSS class name
 * @param {string} props.variant - Display variant ('inline' or 'block')
 * @returns {JSX.Element} Footer links component
 */
const GlobalFooterLinks = ({ className = '', variant = 'inline' }) => {
  const data = useContext(DataContext);
  const language = data?.data?.language || 'en';
  const { pages, loading, error } = usePages();
  const isRTL = language === 'ar';

  // Dynamic text content based on language
  const textContent = {
    ar: {
      // contact: 'تواصل معنا',
      contact: 'Contact Us',

      contactTitle: 'تواصل معنا للحصول على المساعدة والاستفسارات',
      loading: 'جاري التحميل...'
    },
    en: {
      contact: 'Contact Us',
      contactTitle: 'Contact us for help and inquiries',
      loading: 'Loading...'
    }
  };

  const t = textContent[language] || textContent.ar;

  // Show loading state
  if (loading) {
    return (
      <div className={`footer-links ${isRTL ? 'rtl' : 'ltr'} ${className}`}>
        <span>{t.loading}</span>
      </div>
    );
  }

  // Show error state (fallback pages will be shown)
  if (error) {
    console.warn('Failed to load pages from API, using fallback:', error);
  }

  // Render links based on variant
  const renderLinks = () => {
    if (variant === 'inline') {
      return (
        <div className={`footer-links-inline ${isRTL ? 'rtl' : 'ltr'} ${className}`}>
          {/* Contact link - always first */}
          <a 
            href="/contact"
            className="footer-link"
            title={t.contactTitle}>
            {t.contact}
          </a>
          <span className="separator">|</span>
          
          {/* Dynamic pages from API */}
          {pages.map((page, index) => (
            <React.Fragment key={page.id}>
              <a 
                href={`/page/${page.slug}`}
                className="footer-link"
                title={page.meta}
              >
                {page.name}
              </a>
              {index < pages.length - 1 && <span className="separator">|</span>}
            </React.Fragment>
          ))}
        </div>
      );
    }

    // Block variant
    return (
      <div className={`footer-links-block ${isRTL ? 'rtl' : 'ltr'} ${className}`}>
        {/* Contact link - always first */}
        <a 
          href="/contact"
          className="footer-link"
          title={t.contactTitle}
        >
          {t.contact}
        </a>
        
        {/* Dynamic pages from API */}
        {pages.map((page) => (
          <a 
            key={page.id}
            href={`/page/${page.slug}`}
            className="footer-link"
            title={page.meta}
          >
            {page.name}
          </a>
        ))}
      </div>
    );
  };

  return renderLinks();
};

export default GlobalFooterLinks;
