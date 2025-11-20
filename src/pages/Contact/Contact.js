import React, { useState, useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { DataContext } from '../../contextApi/DataContext';
import './Contact.css';

/**
 * Contact page component with contact form and information
 * @returns {JSX.Element} Contact page component
 */
const Contact = () => {
  const { data } = useContext(DataContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  // Get language from context or default to Arabic
  const language = data?.data?.language || 'ar';
  const isRTL = language === 'ar';

  // Dynamic text content based on language
  const textContent = {
    ar: {
      title: 'تواصل معنا',
      subtitle: 'نحن هنا لمساعدتك! تواصل معنا لأي استفسارات أو اقتراحات حول الكوبونات والعروض',
      formTitle: 'أرسل لنا رسالة',
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'أدخل اسمك الكامل',
      emailLabel: 'البريد الإلكتروني *',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      subjectLabel: 'موضوع الرسالة',
      subjectPlaceholder: 'موضوع الرسالة (اختياري)',
      messageLabel: 'الرسالة *',
      messagePlaceholder: 'اكتب رسالتك هنا...',
      submitText: 'إرسال الرسالة',
      submittingText: 'جاري الإرسال...',
      maxAttemptsText: 'تم تجاوز عدد المحاولات المسموح',
      emailTitle: 'البريد الإلكتروني',
      emailText: 'تواصل معنا عبر البريد الإلكتروني',
      phoneTitle: 'الهاتف',
      phoneText: 'اتصل بنا خلال ساعات العمل',
      hoursTitle: 'ساعات العمل',
      hoursText: 'الأحد - الخميس: 9:00 ص - 6:00 م',
      hoursText2: 'الجمعة - السبت: مغلق',
      errors: {
        fillRequired: 'يرجى ملء جميع الحقول المطلوبة',
        validEmail: 'يرجى إدخال بريد إلكتروني صحيح',
        messageLength: 'الرسالة يجب أن تكون على الأقل 10 أحرف',
        success: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
        error: 'حدث خطأ أثناء إرسال الرسالة',
        timeout: 'انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.',
        connectionError: 'لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.',
        invalidResponse: 'تنسيق الاستجابة غير صحيح. يرجى المحاولة مرة أخرى.',
        tooManyRequests: 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.',
        serverError: 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.',
        notFound: 'الرابط غير موجود. يرجى التحقق من الإعدادات.',
        forbidden: 'غير مسموح بالوصول. يرجى المحاولة لاحقاً.',
        generalError: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'
      }
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here to help you! Contact us for any inquiries or suggestions about coupons and offers',
      formTitle: 'Send us a Message',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'Enter your email address',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Message subject (optional)',
      messageLabel: 'Message *',
      messagePlaceholder: 'Write your message here...',
      submitText: 'Send Message',
      submittingText: 'Sending...',
      maxAttemptsText: 'Maximum attempts exceeded',
      emailTitle: 'Email',
      emailText: 'Contact us via email',
      phoneTitle: 'Phone',
      phoneText: 'Call us during business hours',
      hoursTitle: 'Working Hours',
      hoursText: 'Sunday - Thursday: 9:00 AM - 6:00 PM',
      hoursText2: 'Friday - Saturday: Closed',
      errors: {
        fillRequired: 'Please fill in all required fields',
        validEmail: 'Please enter a valid email address',
        messageLength: 'Message must be at least 10 characters long',
        success: 'Your message has been sent successfully! We will contact you soon.',
        error: 'An error occurred while sending the message',
        timeout: 'Request timeout. Please try again.',
        connectionError: 'Cannot connect to server. Please check your internet connection and try again.',
        invalidResponse: 'Invalid response format. Please try again.',
        tooManyRequests: 'Too many requests. Please try again later.',
        serverError: 'Server error. Please try again later.',
        notFound: 'Link not found. Please check settings.',
        forbidden: 'Access denied. Please try again later.',
        generalError: 'An error occurred while sending the message. Please try again.'
      }
    }
  };

  const t = textContent[language] || textContent.ar;

  // Handle form input changes with debouncing for better performance
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Get API base URL based on environment
  const getApiBaseUrl = () => {
    // In production, use full URL
    return 'https://coupon-lands.com/back-end/api';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error(t.errors.fillRequired);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t.errors.validEmail);
      return;
    }

    // Message length validation
    if (formData.message.trim().length < 10) {
      toast.error(t.errors.messageLength);
      return;
    }

    setIsSubmitting(true);
    setSubmitAttempts(prev => prev + 1);

    try {
      const apiUrl = `${getApiBaseUrl()}/contact`;
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      // API call to Laravel backend with proper headers
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache',
        },
        mode: 'cors', // Explicitly set CORS mode
        credentials: 'same-origin', // Use same-origin for better compatibility
        signal: controller.signal, // Add abort signal for timeout
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || (isRTL ? 'رسالة من صفحة التواصل' : 'Message from contact page'),
          message: formData.message.trim()
        })
      });

      clearTimeout(timeoutId);

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      const data = await response.json();

      if (data.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        toast.success(data.message || t.errors.success);
      } else {
        // Handle validation errors
        if (data.errors) {
          const firstError = Object.values(data.errors)[0];
          toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
        } else {
          toast.error(data.message || t.errors.error);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // More specific error handling
      if (error.name === 'AbortError') {
        toast.error(t.errors.timeout);
      } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        toast.error(t.errors.connectionError);
      } else if (error.message.includes('Invalid response format')) {
        toast.error(t.errors.invalidResponse);
      } else if (error.message.includes('HTTP error')) {
        const statusCode = error.message.match(/\d+/)?.[0];
        if (statusCode === '429') {
          toast.error(t.errors.tooManyRequests);
        } else if (statusCode >= '500') {
          toast.error(t.errors.serverError);
        } else if (statusCode === '404') {
          toast.error(t.errors.notFound);
        } else if (statusCode === '403') {
          toast.error(t.errors.forbidden);
        } else {
          toast.error(t.errors.generalError);
        }
      } else {
        toast.error(t.errors.generalError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (<>
      <Helmet>
        <title>{t.title} - Coupon Lands</title>
        <meta 
          name="description" 
          content={t.subtitle}
        />
        <meta name="keywords" content={isRTL ? "تواصل, مساعدة, استفسارات, كوبونات, عروض" : "contact, help, inquiries, coupons, offers"} />
        <html dir={isRTL ? 'rtl' : 'ltr'} lang={language} />
      </Helmet>

      <div className={`contact-page ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="contact-container">
          {/* Header Section */}
          <div className="contact-header">
            <h1 className="contact-title">{t.title}</h1>
            <p className="contact-subtitle">
              {t.subtitle}
            </p>
          </div>

          {/* Main Content */}
          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="form-title">{t.formTitle}</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder={t.namePlaceholder}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder={t.emailPlaceholder}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    {t.subjectLabel}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder={t.subjectPlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder={t.messagePlaceholder}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit"
                  disabled={isSubmitting || submitAttempts >= 3}
                >
                  {isSubmitting 
                    ? t.submittingText
                    : submitAttempts >= 3 
                      ? t.maxAttemptsText
                      : t.submitText
                  }
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              {/* Email Contact */}
              <div className="contact-info-card">
                <div className="info-icon">📧</div>
                <h3 className="info-title">{t.emailTitle}</h3>
                <p className="info-text">
                  {t.emailText}
                </p>
                <a 
                  href="mailto:info@coupon-lands.com" 
                  className="info-link"
                >
                  info@coupon-lands.com
                </a>
              </div>

              {/* Phone Contact */}
              <div className="contact-info-card">
                <div className="info-icon">📞</div>
                <h3 className="info-title">{t.phoneTitle}</h3>
                <p className="info-text">
                  {t.phoneText}
                </p>
                <a 
                  href="tel:+966501234567" 
                  className="info-link"
                >
                  +966 50 123 4567
                </a>
              </div>

              {/* Working Hours */}
              <div className="contact-info-card">
                <div className="info-icon">🕒</div>
                <h3 className="info-title">{t.hoursTitle}</h3>
                <p className="info-text">
                  {t.hoursText}<br />
                  {t.hoursText2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
