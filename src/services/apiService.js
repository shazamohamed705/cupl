import axios from 'axios';

// Base API URL
const API_BASE_URL = 'https://coupon-lands.com/back-end/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error - no response from server');
    }
    
    // Create a more descriptive error
    const enhancedError = new Error(
      error.response?.data?.message || 
      error.message || 
      'Unknown error occurred'
    );
    enhancedError.response = error.response;
    enhancedError.request = error.request;
    enhancedError.config = error.config;
    
    return Promise.reject(enhancedError);
  }
);

// Get current hostname
const getCurrentHostname = () => {
  return window.location.hostname;
};

// Homepage API functions
export const homepageAPI = {
  // Get all homepage data in one request
  getHomepageData: async () => {
    try {
      const response = await apiClient.get('/homepage/data', {
        params: { domain: getCurrentHostname() }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      // Return a safe default structure instead of throwing
      return {
        success: false,
        data: null,
        error: error.message || 'Unknown error'
      };
    }
  },

  // Get featured stores
  getFeaturedStores: async () => {
    try {
      const response = await apiClient.get('/homepage/featured-stores', {
        params: { domain: getCurrentHostname() }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured stores:', error);
      throw error;
    }
  },

  // Get latest coupons
  getLatestCoupons: async () => {
    try {
      const response = await apiClient.get('/homepage/latest-coupons', {
        params: { domain: getCurrentHostname() }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching latest coupons:', error);
      throw error;
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/homepage/categories', {
        params: { domain: getCurrentHostname() }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get homepage statistics
  getHomepageStats: async () => {
    try {
      const response = await apiClient.get('/homepage/stats', {
        params: { domain: getCurrentHostname() }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching homepage stats:', error);
      throw error;
    }
  },
};

// Store API functions
export const storeAPI = {
  // Get store by name and hostname
  getStore: async (name, hostname = null) => {
    try {
      const currentHostname = hostname || getCurrentHostname();
      const response = await apiClient.get(`/stores/get/${name}/${currentHostname}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching store:', error);
      throw error;
    }
  },
};

// Utility functions
export const apiUtils = {
  // Format store data for display
  formatStoreData: (store) => {
    return {
      id: store.id,
      name: store.name_en || store.name_ar,
      nameAr: store.name_ar,
      nameEn: store.name_en,
      link: store.link_en || store.link_ar,
      linkAr: store.link_ar,
      linkEn: store.link_en,
      pageLink: store.page_link,
      category: store.category,
      image: store.image?.[0]?.image_url || null,
      coupons: store.coupons || [],
    };
  },

  // Format coupon data for display
  formatCouponData: (coupon) => {
    return {
      id: coupon.id,
      code: coupon.code,
      title: coupon.title,
      type: coupon.type,
      link: coupon.link,
      discountPercentage: coupon.discount_percentage,
      description: coupon.description_en || coupon.description_ar,
      descriptionAr: coupon.description_ar,
      descriptionEn: coupon.description_en,
      timer: coupon.timer,
      color: coupon.color,
      isFeatured: coupon.is_featured,
      store: coupon.store,
      countries: coupon.countries || [],
    };
  },

  // Format category data for display
  formatCategoryData: (category) => {
    return {
      id: category.id,
      name: category.name_en || category.name_ar,
      nameAr: category.name_ar,
      nameEn: category.name_en,
      storesCount: category.stores_count || 0,
      image: category.image?.[0]?.image_url || null,
    };
  },
};

export default apiClient;
