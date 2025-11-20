import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { homepageAPI } from "../services/apiService";

function HeadInjection() {
  const [domainData, setDomainData] = useState(null);

  useEffect(() => {
    const fetchDomainData = async () => {
      try {
        const response = await homepageAPI.getHomepageData();
        if (response && response.success && response.data && response.data.domain) {
          setDomainData(response.data.domain);
        }
      } catch (error) {
        console.error('Error fetching domain data for analytics:', error);
        // Don't throw error, just log it - component should still render
        // Set domainData to null to prevent further errors
        setDomainData(null);
      }
    };

    fetchDomainData();
  }, []);

  const { gtmId, gtagId, conversionSendTo } = useMemo(() => {
    // Get analytics from domain.analytics (from domain first, then from theme)
    const analytics = domainData?.analytics || {};
    const gtm = analytics.gtm_container_id;
    const gtag = analytics.gtag_id;
    const sendTo = analytics.copy_conversion_send_to;
    
    return { gtmId: gtm, gtagId: gtag, conversionSendTo: sendTo };
  }, [domainData]);

  const gtmScript = gtmId
    ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`
    : null;

  const gtagInlineInit = gtagId
    ? `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gtagId}');`
    : null;

  const conversionFunction = conversionSendTo
    ? `window.gtag_report_conversion = function(url){
  try{
    if(typeof gtag === 'function'){
      var callback = function(){ if(typeof(url) !== 'undefined'){ window.location = url; } };
      gtag('event','conversion',{'send_to':'${conversionSendTo}','event_callback':callback});
      return true;
    }
  }catch(e){}
  return false;
};`
    : null;

  if (!gtmId && !gtagId && !conversionSendTo) return null;

  return (
    <Helmet>
      {gtagId ? <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} /> : null}
      {gtagInlineInit ? <script>{gtagInlineInit}</script> : null}
      {gtmScript ? <script>{gtmScript}</script> : null}
      {conversionFunction ? <script>{conversionFunction}</script> : null}
    </Helmet>
  );
}

export default HeadInjection;


