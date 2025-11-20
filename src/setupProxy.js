const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://coupon-lands.com',
      changeOrigin: true,
      secure: true,
      logLevel: 'warn', // Reduce log verbosity
      timeout: 30000, // 30 second timeout
      proxyTimeout: 30000,
      onProxyReq: (proxyReq, req, res) => {
        // Add proper headers for Laravel
        proxyReq.setHeader('X-Forwarded-Proto', 'https');
        proxyReq.setHeader('X-Forwarded-For', req.ip);
        proxyReq.setHeader('X-Real-IP', req.ip);
        
        // Add CORS headers for preflight requests
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
          res.setHeader('Access-Control-Max-Age', '86400');
          res.statusCode = 200;
          res.end();
          return;
        }
      },
      onProxyRes: (proxyRes, req, res) => {
        // Add CORS headers to response
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With, Accept';
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'false';
        
        // Remove security headers that might cause issues
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['x-content-type-options'];
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ 
          success: false, 
          message: 'Proxy server error' 
        });
      }
    })
  );
};
