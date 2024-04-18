import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CarList from "./components/cars/CarList.jsx";
import CarForm from "./components/cars/CarForm.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cars" />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/new" element={<CarForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
