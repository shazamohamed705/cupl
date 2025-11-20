import React, { useContext } from 'react';
import { DataContext } from '../contextApi/DataContext';
import GlobalFooterLinks from './GlobalFooterLinks';
import './GlobalFooter.css';

/**
 * Global footer component that displays footer links and copyright
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS class name
 * @param {string} props.variant - Links display variant ('inline' or 'block')
 * @returns {JSX.Element} Global footer component
 */
const GlobalFooter = ({ 
  className = '', 
  variant = 'inline'
}) => {
  const data = useContext(DataContext);
  const language = data?.data?.language || 'ar';
  const year = new Date().getFullYear();
  const isRTL = language === 'ar';
  
  const copyrightText = language === 'ar' 
    ? `جميع الحقوق محفوظة © ${year}`
    : `All rights reserved © ${year}`;

  return (
    <footer className={`global-footer ${isRTL ? 'rtl' : 'ltr'} ${className}`}>
      <GlobalFooterLinks 
        className="links_footer" 
        variant={variant}
          language={language}
      />
      <p className="copyright">
        {copyrightText}
      </p>
    </footer>
  );
};

export default GlobalFooter;
