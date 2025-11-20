import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./TrendyolLanding.css";
import trImg from "../../assets/images/trenn.png";
import { DataContext } from "../../contextApi/DataContext";
import useGlobalRedirectOnClick from "../../hooks/useGlobalRedirectOnClick";
import NotFound from "../not-found/NotFound";

function TrendyolLanding({
  fallbackCode = "JUSTAPP40",
  fallbackShopUrl = "https://www.trendyol.com/",
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setId, host, loading } = useContext(DataContext);

  useEffect(() => {
    if (id) {
      setId(id);
    }
  }, [id, setId]);

  useEffect(() => {
    if (
      id &&
      !loading &&
      data?.data?.coupons?.fake_page === 1 &&
      data?.domain?.theme?.name === "default_7"
    ) {
      navigate(`/${id}`, { replace: true });
    }
  }, [data?.data?.coupons?.fake_page, data?.domain?.theme?.name, id, loading, navigate]);

  const couponData = data?.data?.coupons ?? {};
  const couponType = (couponData?.type || "code").toLowerCase();
  const couponCode = couponData?.code || fallbackCode;
  const couponLink =
    couponData?.url ||
    couponData?.link ||
    data?.data?.url ||
    data?.language?.link ||
    fallbackShopUrl;
  const discountPercentage =
    couponData?.discount_percentage ??
    couponData?.discount ??
    "40%";
  const storeNameAr = data?.data?.name_ar ?? data?.data?.name_en ?? "ترينديول";
  const storeNameEn = data?.data?.name_en ?? "Trendyol";
  const language = data?.data?.language || "ar";
  const isRTL = language === "ar" || language === "ar-sa";
  const countries =
    data?.pluckCountries ||
    couponData?.countries?.join(" - ") ||
    "السعودية - الامارات - الكويت";
  const heroImage =
    data?.data?.image ||
    data?.data?.logo ||
    data?.data?.store_logo ||
    couponData?.logo ||
    trImg;

  useGlobalRedirectOnClick(couponType, couponLink);

  const storageKey = useMemo(
    () => (id ? `trendyol_copy_count_${id}` : "trendyol_copy_count"),
    [id]
  );

  const [copyToast, setCopyToast] = useState("");
  const [copyCount, setCopyCount] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    const num = saved ? parseInt(saved, 10) : NaN;
    return !Number.isNaN(num) ? num : 1240;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const modalShownRef = useRef(false);
  const couponWrapRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const num = parseInt(saved, 10);
      if (!Number.isNaN(num)) setCopyCount(num);
    }
  }, [storageKey]);

  const persistCopyCount = useCallback((next) => {
    setCopyCount(next);
    try {
      localStorage.setItem(storageKey, String(next));
    } catch {}
  }, [storageKey]);

  const increaseCopyCount = useCallback(() => {
    const inc = Math.floor(Math.random() * 3) + 1;
    persistCopyCount(copyCount + inc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyCount, persistCopyCount]);

  const showLocalToast = useCallback((message) => {
    setCopyToast(message);
    const t = setTimeout(() => setCopyToast(""), 1000);
    return () => clearTimeout(t);
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(couponCode);
      } else {
        const ta = document.createElement("textarea");
        ta.value = couponCode;
        ta.style.position = "fixed";
        ta.style.left = "-999999px";
        ta.style.top = "-999999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showLocalToast(language === "en" ? "Coupon copied successfully" : "تم نسخ الكود بنجاح وسيتم تحويلك للموقع");
      increaseCopyCount();
      return true;
    } catch {
      showLocalToast(language === "en" ? "Failed to copy code" : "فشل في نسخ الكود");
      return false;
    }
  }, [couponCode, increaseCopyCount, language, showLocalToast]);

  const onCopy = useCallback(() => {
    copyToClipboard().then(() => {
      if (typeof window.gtag_report_conversion === "function") {
        try { window.gtag_report_conversion(); } catch {}
      }
    });
  }, [copyToClipboard]);

  const onShop = useCallback(async () => {
    await copyToClipboard();
    if (typeof window.gtag_report_conversion === "function") {
      try { window.gtag_report_conversion(); } catch {}
    }
    window.open(couponLink, "_blank", "noopener,noreferrer");
  }, [copyToClipboard, couponLink]);

  useEffect(() => {
    const onMouseLeave = (e) => {
      if (e.clientY <= 0 && !modalShownRef.current) {
        modalShownRef.current = true;
        setModalOpen(true);
      }
    };
    window.addEventListener("mouseleave", onMouseLeave);
    return () => window.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
  const heroTitle =
    language === "en"
      ? `${storeNameEn} coupon up to ${discountPercentage}`
      : `كود خصم ${storeNameAr} حتى ${discountPercentage}`;
  const heroSubtitle =
    language === "en"
      ? "Copy the coupon then tap shop now to unlock top deals on fashion, shoes, and electronics."
      : "انسخ الكود ثم اضغط تسوّق الآن. يعمل على أفضل الماركات في الأزياء والأحذية والإلكترونيات.";

  if (!data && !loading) {
    return <NotFound />;
  }

  return (
    <div
      className={isRTL ? "ty-root rtl" : "ty-root"}
      style={{
        background:
          "linear-gradient(180deg,var(--bg),#0e121a 60%, #111827)",
        color: "var(--text)",
        fontFamily:
          "Tajawal, system-ui,-apple-system, Segoe UI, Roboto, sans-serif",
        minHeight: "100vh",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <Helmet>
        <html dir={isRTL ? "rtl" : "ltr"} lang={language} />
        <title>
          {(host ?? "") + " | " + (storeNameEn || "Trendyol")} - Coupon
        </title>
        <meta
          name="description"
          content={
            data?.data?.seo_description ||
            `Get the latest coupons for ${storeNameEn} and save up to ${discountPercentage}.`
          }
        />
      </Helmet>
      <header className="ty-hero ty-container">
        <div className="ty-hero-grid">
          <div className="ty-card">
            <div className="ty-hero-image">
              <img src={heroImage} alt={storeNameAr || storeNameEn} />
            </div>
            <h1 className="ty-h1">{heroTitle}</h1>
            <p className="ty-sub">{heroSubtitle}</p>

            <div className="ty-coupon-wrap" role="region" aria-label="منطقة الكوبون" ref={couponWrapRef}>
              <div className="ty-coupon" id="couponBox">
                <div className="ty-code" aria-label="كود الكوبون الكبير" id="bigCode">
                  {couponCode}
                </div>
                <div className="ty-actions">
                  <button className="ty-btn ty-btn-outline" onClick={onCopy} aria-label="انسخ الكود">
                    {language === "en" ? "Copy code" : "انسخ الكود"}
                  </button>
                  <button className="ty-btn ty-btn-primary" onClick={onShop} aria-label="تسوّق الآن">
                    {language === "en" ? "Shop now" : "تسوّق الآن"}
                  </button>
                </div>
              </div>
              {copyToast ? <div className="ty-copy-toast">{copyToast}</div> : null}
            </div>

            <div className="ty-trust">
              <div className="mini">
                <span>✅</span>
                <div>
                  <b className="ty-mini-b">
                    {language === "en" ? "Coupon is 100% active" : <>كود <span style={{ fontSize: 20 }}>100%</span> فعال</>}
                  </b>
                </div>
              </div>
              <div className="mini">
                <span>📋</span>
                <div>
                  <b className="ty-mini-b">
                    {language === "en" ? "Copied" : "نسخ"}{" "}
                    <span id="copyCount" style={{ fontSize: 20 }}>
                      {copyCount}
                    </span>{" "}
                    {language === "en" ? "times" : "مرة"}
                  </b>
                </div>
              </div>
              <div className="mini">
                <span>🔥</span>
                <div>
                  <b className="ty-mini-b">
                    {language === "en" ? "Up to" : "حتى"}{" "}
                    <span style={{ fontSize: 20 }}>{discountPercentage}</span>{" "}
                    {language === "en" ? "off" : "خصم"}
                  </b>
                </div>
              </div>
              <div className="mini">
                <span>⏰</span>
                <div>
                  <b className="ty-mini-b">
                    {language === "en" ? "Updated minutes ago" : (
                      <>منذ <span style={{ fontSize: 20 }}>12</span> دقيقة</>
                    )}
                  </b>
                </div>
              </div>
            </div>
          </div>

          <div className="ty-card">
            <h2 className="ty-h2">
              {language === "en" ? "Coupon active in" : "الكوبون فعال في الدول الاتية"}
            </h2>
            <div className="ty-feature">
              <p style={{ margin: "0 0 8px 0", lineHeight: 1.6, fontSize: 20 }}>
                {countries}
              </p>
            </div>
            <h2 className="ty-h2" style={{ marginTop: 16 }}>
              {language === "en" ? "How to use the code" : "طريقة استخدام الكود"}
            </h2>
            <ol className="ty-notes" style={{ lineHeight: 2 }}>
              <li>
                {language === "en"
                  ? <>Click <b>Copy code</b> or press “Shop now” to auto copy.</>
                  : <>اضغط علي زر <b>انسخ الكود</b> – أو سيتم نسخ الكود تلقائياً عند الضغط علي زر "تسوّق الآن"</>}
              </li>
              <li>
                {language === "en"
                  ? "The store will open in a new tab."
                  : "يتم فتح المتجر في تبويب جديد."}
              </li>
              <li>
                {language === "en"
                  ? "Paste the coupon at checkout and enjoy the discount."
                  : "ألصق الكود عند الدفع واستمتع بالخصم."}
              </li>
            </ol>
          </div>
        </div>
      </header>

      <footer className="ty-footer">
        <div className="ty-container">
          <div style={{ textAlign: "center" }}>
            <div className="ty-footer-links">
              <a href="#privacy">{language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}</a>
              <span className="sep" style={{ color: "#374151" }}>|</span>
              <a href="#terms">{language === "en" ? "Terms" : "شروط الاستخدام"}</a>
              <span className="sep" style={{ color: "#374151" }}>|</span>
              <a href="#about">{language === "en" ? "About" : "من نحن"}</a>
              <span className="sep" style={{ color: "#374151" }}>|</span>
              <a href="#contact">{language === "en" ? "Contact" : "تواصل معنا"}</a>
            </div>
            <div style={{ fontSize: 14, color: "#6b7280" }}>
              {language === "en"
                ? `All rights reserved ${year} © ${host || "Coupon Lands"}`
                : `جميع الحقوق محفوظة ${year} © ${host || "وادي الكوبونات"}`}
            </div>
          </div>
        </div>
      </footer>

      <div className={`ty-modal ${modalOpen ? "active" : ""}`} role="dialog" aria-modal={modalOpen ? "true" : "false"} aria-label="تذكير بالكوبون">
        <div className="ty-modal-box">
          <h2 style={{ marginTop: 0 }}>
            {language === "en" ? "Before you leave ✋" : "قبل أن تغادر ✋"}
          </h2>
          <p>
            {language === "en"
              ? <>Don’t forget to use the code <b>{couponCode}</b> to save up to {discountPercentage}.</>
              : <>لا تنسَ استخدام الكود <b>{couponCode}</b> للحصول على خصم حتى {discountPercentage}.</>}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="ty-btn ty-btn-outline" onClick={() => setModalOpen(false)}>
              {language === "en" ? "Continue browsing" : "متابعة التصفح"}
            </button>
            <button
              className="ty-btn ty-btn-primary"
              onClick={() => {
                onShop();
                setModalOpen(false);
              }}
            >
              {language === "en" ? "Copy & shop now" : "انسخ الكود & تسوّق الآن"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendyolLanding;

