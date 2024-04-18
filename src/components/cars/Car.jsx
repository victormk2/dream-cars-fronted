import React, { useState } from "react";
import "./car.css";

const Car = (props) => {
  let car = props.car;
  
  return (
    <>
      <li key={car.id}>
        {car.model}-{car.year}
      </li>
      {car.photo && <img src={car.photo} className="img_container" />}
    </>
  );
};

export default Car;
