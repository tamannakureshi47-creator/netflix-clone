import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden overflow-y-auto">
      
      <Navbar />

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;