import React from "react";
import "./ContentSix.css";
const ContentSix = ({ data }) => {
  const title = data?.data?.coupons?.title;

  const description = data?.language?.coupons;
  return (
    <div className="ContentSix">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default ContentSix;
