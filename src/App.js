import React from "react";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./output.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <div className="text-xl">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default App;
