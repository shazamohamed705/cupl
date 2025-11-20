import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { DataContext } from "../../contextApi/DataContext";
import Footer from "../../components/coupontComponents/footer/Footer";
import normalizeDomain from "../../utils/normalizeDomain";
import "./StaticPage.css";

const BASE_URL = "https://coupon-lands.com/back-end";

const StaticPage = () => {
  const { slug } = useParams();
  const { host, data } = useContext(DataContext);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const domainFromData = data?.domain?.slug || data?.domain?.name || null;
  const effectiveDomain = useMemo(() => {
    if (host === "localhost") return "localhost";
    if (typeof domainFromData === "string" && domainFromData.length > 0) return normalizeDomain(domainFromData);
    return normalizeDomain(host) || "coupon-lands";
  }, [host, domainFromData]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = `${BASE_URL}/api/pages`;

        const pickFirst = (res) => {
          const pages = res?.data?.pages || res?.data?.data || res?.data;
          if (Array.isArray(pages)) {
            return pages.find(page => page.slug === slug) || pages[0];
          }
          return pages;
        };

        // 1) Try with domain and name parameter
        let res = await axios.get(url, { 
          params: { 
            domain: effectiveDomain, 
            name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          } 
        });
        let page = pickFirst(res);
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.log("StaticPage: primary with name", { effectiveDomain, slug, pageFound: !!page });
        }

        // 2) Fallback to coupon-lands domain with name
        if (!page && effectiveDomain !== "coupon-lands") {
          res = await axios.get(url, { 
            params: { 
              domain: "coupon-lands", 
              name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            } 
          });
          page = pickFirst(res);
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log("StaticPage: fallback coupon-lands with name", { slug, pageFound: !!page });
          }
        }

        // 3) Try with slug parameter as fallback
        if (!page) {
          res = await axios.get(url, { params: { domain: effectiveDomain, slug } });
          page = pickFirst(res);
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log("StaticPage: fallback with slug", { effectiveDomain, slug, pageFound: !!page });
          }
        }

        // 4) Final fallback: global with slug
        if (!page) {
          res = await axios.get(url, { params: { slug } });
          page = pickFirst(res);
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log("StaticPage: final fallback global", { slug, pageFound: !!page });
          }
        }

        setContent(page || null);
      } catch (err) {
        setError(err);
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.log("StaticPage: error", err);
        }
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPage();
  }, [effectiveDomain, slug]);

  const language = data?.data?.language || "ar";
  const title = content?.name || content?.title || content?.title_ar || content?.title_en;
  const body = content?.content || content?.description || content?.content_ar || content?.content_en;

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | ${host ?? ""}` : host ?? ""}</title>
        <meta name="robots" content="noindex,follow" />
        {content?.meta && <meta name="description" content={content.meta} />}
      </Helmet>
      <main className="static-page-container">
        {loading && (
          <div className="static-page-loading">
            <p>جاري تحميل الصفحة...</p>
          </div>
        )}
        {!loading && error && (
          <div className="static-page-error">
            <p>حدث خطأ أثناء جلب الصفحة. يرجى المحاولة مرة أخرى.</p>
          </div>
        )}
        {!loading && !error && !content && (
          <div className="static-page-not-found">
            <p>لا توجد صفحة بهذا المعرف.</p>
          </div>
        )}
        {!loading && !error && content && (
          <article className="static-page-content">
            <h1 className="static-page-title">
              {title}
            </h1>
            <div className="static-page-body">
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: body || "" }} />
            </div>
          </article>
        )}
      </main>
      <Footer class={"pageFooter"} lang={language} />
    </>
  );
};

export default StaticPage;


