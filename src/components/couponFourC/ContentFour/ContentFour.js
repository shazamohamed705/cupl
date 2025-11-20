import React, { useEffect, useRef, useState } from "react";
import "./ContentFour.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ContentFour = ({ data }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // console.log(data);
  useEffect(() => {
    const savedTimestamp = localStorage.getItem("destinationTime");
    const now = new Date().getTime();
    let destination;

    if (!savedTimestamp) {
      // console.log(savedTimestamp);
      // Calculate and save the destination time
      destination = now + data?.data?.coupons?.timer * 60 * 60 * 1000; // Convert hours to milliseconds
      localStorage.setItem("destinationTime", destination.toString());
    } else {
      destination = parseInt(savedTimestamp, 10);
    }

    // Calculate the remaining time and update the state
    const updateTimer = () => {
      const now = new Date().getTime();
      const remainingTime = destination - now;

      if (remainingTime <= 0 || !remainingTime) {
        // Handle timer end
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        localStorage.removeItem("destinationTime");
        return;
      }

      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };

    // Initial update
    updateTimer();

    // Set interval to update the timer every second
    const intervalId = setInterval(updateTimer, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [data]);

  const inputRef = useRef(null);
  const language = data?.data?.language || "ar";
  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand("copy");
    toast.success(language === "ar" ? "تم نسخ الكود بنجاح" : "Code copied successfully");
    if (typeof window.gtag_report_conversion === "function") {
      try { window.gtag_report_conversion(); } catch {}
    }
  };

  // const store = data?.language?.store;
  const title = data?.data?.coupons?.title;

  const description = data?.language?.coupons;
  const discountPercentage = data?.data?.coupons?.discount_percentage;

  const type = data?.data?.coupons?.type;
  const couponCode = data?.data?.coupons?.code;
  const couponLink = data?.data?.coupons?.link;
  const StoreLink = data?.language?.link;

  

  return (
    <div className="ContentFour container">
      {discountPercentage && language === "ar" ? (
        <span className="offer">خصم {discountPercentage}%</span>
      ) : (
        <span className="offer">
          Discount {discountPercentage}%
        </span>
      )}
      <div className="ContentFour_content">
        <div className="ContentFour_content_header">
          <h1>
            {title}
            {/* خصم {discountPercentage ? `${discountPercentage}%` : ""} من {store} */}
          </h1>
          {description && <p className="mt-3">{description}</p>}
        </div>
        <div className="ContentFour_content_countDown">
          <span>{language === "ar" ? "الخصم ينتهي خلال" : "Discount ends in"}</span>
          <h2>
            <span>{String(days).padStart(2, "0")}</span>:
            <span>{String(hours).padStart(2, "0")}</span>:
            <span>{String(minutes).padStart(2, "0")}</span>:
            <motion.span
              key={seconds}
              className="sec"
              exit={{ y: 10, opacity: 1, position: "absolute" }}
              initial={{ y: 10, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.7 }}
            >
              {String(seconds).padStart(2, "0")}
            </motion.span>
          </h2>
        </div>

        {type === "link" ? (
          <div className="ContentFour_content_copyBtn">
            <button>
              <a href={couponLink} target="_blank" rel="noopener noreferrer">
                {language === "ar" ? "احصل على الخصم" : "GET OFFER"}
              </a>
            </button>
          </div>
        ) : type === "code" ? (
          <>
            <div className="ContentFour_content_copyBtn">
              <input
                type="text"
                defaultValue={couponCode}
                readOnly
                ref={inputRef}
              />
              <button onClick={copyToClipboard}>
                {language === "ar" ? "احصل على الكود" : "GET CODE"}
              </button>
            </div>
            <a href={StoreLink} className="visitFour">
              {language === "ar" ? "اذهب الي الموقع" : "VISIT WEBSITE"}
            </a>
          </>
        ) : (
          <div className="ContentFour_content_copyBtn">
            <input
              type="text"
              defaultValue={couponCode}
              readOnly
              ref={inputRef}
            />
            <button
              onClick={async () => {
                await copyToClipboard();
                window.location.href = couponLink;
              }}
            >
              {language === "ar" ? "احصل على الكود" : "GET CODE"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentFour;
