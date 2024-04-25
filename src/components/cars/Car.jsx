import React from "react";
import { useNavigate } from "react-router-dom";
import "./car.css";

const Car = ({ car }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/cars/${car.id}`);
  };

  return (
    <div className="card card__style">
      <img
        src={car.photo ? car.photo : "../src/assets/image-not-found.png"}
        className="card-img-top h-100 img-fluid"
        alt="Car"
      />
      <div className="card-body">
        <h5 className="card-title">{car.model}</h5>
        <p className="card-text">{car.year}</p>
        <button onClick={handleEdit} className="btn btn-primary">
          Editar
        </button>
      </div>
    </div>
  );
};

export default Car;
