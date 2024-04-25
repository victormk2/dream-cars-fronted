import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./car.css";
import Header from "../default/header/Header";

const CarForm = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming your route has a parameter for car ID

  const [car, setCar] = useState({
    model: "",
    year: "",
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const imageInputRef = useRef(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to track if in edit mode

  useEffect(() => {
    if (id) {
      // Fetch car details by ID and populate the form if in edit mode
      fetch(`http://127.0.0.1:3000/cars/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao obter detalhes do carro");
          }
          return response.json();
        })
        .then((data) => {
          let car = data.car;
          setCar({
            model: car.model,
            year: car.year,
          });

          if (car.photo) {
            setImageUrl(car.photo);
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
          setError("Erro ao obter detalhes do carro");
        });
      setIsEditing(true); // Set edit mode
    }
  }, [id]);

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
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("image", image);

    const url = isEditing
      ? `http://127.0.0.1:3000/cars/${id}`
      : "http://127.0.0.1:3000/cars";
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method: method,
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

  const handleReturn = () => {
    navigate("/cars");
  };

  const handleImageRemoval = () => {
    setImage(null);
    setImageUrl(null);
  };

  return (
    <div className="container list_container">
      <Header title={isEditing ? "Editar Carro" : "Cadastro de Carros"} />
      <form onSubmit={handleSubmit} className="form__style">
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
          <div className="input_group mb-3">
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
                <span style={{ color: "red" }}>{error}</span>
              </div>
            )}
          </div>
          {!imageUrl && (
            <div className="input-group mb-3">
              <label>
                Image:
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
          {imageUrl && (
            <>
              <div className="img-container-input">
                <img
                  src={imageUrl}
                  className="img-thumbnail img_container-big img-fluid"
                  alt="Car"
                />
                <button onClick={handleImageRemoval} className="btn btn-danger btn-removal">
                  Remover imagem
                </button> 
              </div>
            </>
          )}
        </div>
      </form>
      <div className="btn_container">
        <button onClick={handleSubmit} className="btn btn-primary">
          {isEditing ? "Salvar Alterações" : "Cadastrar"}
        </button>
        <button onClick={handleReturn} className="btn btn-secondary">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default CarForm;
