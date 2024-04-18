import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./car.css";
import Car from "./Car";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/cars")
      .then((response) => response.json())
      .then((data) => setCars(data.cars))
      .catch((error) => console.error("Erro ao obter cars:", error));
  }, []);

  return (
    <>
      <div className="container list_container">
        <h2>Cars list</h2>
        <ul>
          {cars.map((car) => (
            <Car key={car.id} car={car} />
          ))}
        </ul>
      </div>
      <div className="container list_container bottom_container">
        <Link type="button" className="btn btn-primary" to="new">
          Adicionar carro
        </Link>
      </div>
    </>
  );
};

export default CarList;
