import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./car.css";

const CarForm = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const [car, setCar] = useState({
    model: "",
    year: "",
  });
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
    if (name === "year") {
      if (value < 0 || value > currentYear) {
        setError(`O ano deve estar entre 0 e ${currentYear}`);
      } else {
        setError("");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("image", image);

    e.preventDefault();
    fetch("http://127.0.0.1:3000/cars", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao enviar dados do carro");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Carro enviado com sucesso:", data);
        navigate("/cars");
      })
      .catch((error) => {
        console.error("Erro:", error);
        setError("Erro ao enviar dados do carro");
      });
  };

  const handleReturn = (e) => {
    navigate("/cars");
  };

  return (
    <div className="container list_container">
      <h2>Cadastro de Carro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_container">
          <div className="input_group">
            <label>
              Model:
              <input
                type="text"
                name="model"
                value={car.model}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="input_group">
            <label>
              Year:
              <input
                type="number"
                name="year"
                value={car.year}
                onChange={handleChange}
              />
            </label>
            {error && (
              <div className="error_container">
                {<span style={{ color: "red" }}>{error}</span>}
              </div>
            )}
          </div>
          <div className="input_group">
            <label>
              Image:
              <input
                type="file"
                name="image"
                ref={imageInputRef}
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
      </form>
      <div className="btn_container">
        <button onClick={handleSubmit} className="btn btn-primary">
          Cadastrar
        </button>
        <button onClick={handleReturn} className="btn btn-secondary">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default CarForm;
