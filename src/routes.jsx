import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CarList from "./components/cars/CarList.jsx";
import CarForm from "./components/cars/CarForm.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão que redireciona para a lista de carros */}
        <Route path="/" element={<Navigate to="/cars" />} />
        
        {/* Rota para exibir a lista de carros */}
        <Route path="/cars" element={<CarList />} />
        
        {/* Rota para adicionar um novo carro */}
        <Route path="/cars/new" element={<CarForm />} />
        
        {/* Rota para editar um carro existente */}
        <Route path="/cars/:id" element={<CarForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
