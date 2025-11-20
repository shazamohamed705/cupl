import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch pages data from API
 * @returns {Object} - { pages, loading, error }
 */
const usePages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get current domain
        const currentDomain = window.location.hostname;
        
        // Make API request
        const response = await fetch(
          `https://coupon-lands.com/back-end/api/pages?domain=${currentDomain}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPages(data.pages || []);
      } catch (err) {
        console.error('Error fetching pages:', err);
        setError(err.message);
        // Fallback to default pages if API fails - matching exact API response
        setPages([
          {
            id: 1,
            slug: "privacy-policy",
            name: "Privacy Policy",
            meta: "Learn about our Privacy Policy and how we protect your personal data when using our coupons and deals. We are committed to transparency and secure shopping."
          },
          {
            id: 2,
            slug: "terms-of-use", 
            name: "Terms of Use",
            meta: "Read our Terms of Use to understand your rights and responsibilities when accessing coupons and deals. We ensure transparency for a safe experience."
          },
          {
            id: 3,
            slug: "about-us",
            name: "About Us", 
            meta: "Discover our website dedicated to discount coupons and exclusive deals. Our mission is to help you save money while shopping online easily and securely."
          },
          {
            id: 4,
            slug: "faq",
            name: "FAQ",
            meta: "Find answers to the most common questions about using our site, discount coupons, and how to get the best deals easily."
          },
          {
            id: 5,
            slug: "cookie-policy",
            name: "Cookie Policy",
            meta: "Learn how our website uses cookies to enhance your experience, personalize content, and analyze traffic safely and transparently."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return { pages, loading, error };
};

export default usePages;
