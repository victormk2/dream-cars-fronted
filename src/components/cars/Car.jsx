import React, { useState } from "react";
import "./car.css";

const Car = (props) => {
  let car = props.car;
  let imagePath = car.photo ? car.photo : "../src/assets/image-not-found.png";

  return (
    <>
      <div className="card card__style">
        <img src={imagePath} className="card-img-top h-100 img-fluid" />
        <div className="card-body">
          <h5 className="card-title">{car.model}</h5>
          <p className="card-text">{car.year}</p>
        </div>
      </div>
    </>
  );
};

export default Car;
