import React, { useContext } from "react";
import "./NotFound.css";
import { Helmet } from "react-helmet-async";
import { DataContext } from "../../contextApi/DataContext";
const NotFound = () => {
  const returnBtn = () => {
    window.location.reload();
  };
  const {host} = useContext(DataContext)
  return (
    <>
      <Helmet>
        <title>
          {host ?? ""}
        </title>
      </Helmet>
      <div className="not-found-container">
        <h1 className="not-found-title">404 - Not Found</h1>
        <p className="not-found-message">
          The page you are looking for does not exist.
        </p>
        <button className="btn btn-lg btn-success" onClick={returnBtn}>
          Reload
        </button>
      </div>
    </>
  );
};

export default NotFound;
