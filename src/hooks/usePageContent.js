import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch page content from API
 * @param {string} pageName - The name of the page to fetch
 * @returns {Object} - { content, loading, error }
 */
const usePageContent = (pageName) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pageName) return;

    const fetchPageContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get current domain
        const currentDomain = window.location.hostname;
        
        // Make API request for page content
        const response = await fetch(
          `https://coupon-lands.com/back-end/api/pages?domain=${currentDomain}&name=${encodeURIComponent(pageName)}`,
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
        setContent(data);
      } catch (err) {
        console.error('Error fetching page content:', err);
        setError(err.message);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [pageName]);

  return { content, loading, error };
};

export default usePageContent;
