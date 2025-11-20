import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import './timerSix.css'
const TimerSix = ({ data }) => {
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

  
  return (
    <div className="ContentFour_content_countDown timerSix">
      <span>متبقي على الخصم</span>
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
  );
};

export default TimerSix;
