import React from "react";
import NavbarComponents from "./components/NavbarComponents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SuplierIndex from "./pages/suplier/SuplierIndex";
import SuplierCreate from "./pages/suplier/Create";
import SuplierEdit from "./pages/suplier/Edit";
import Barang from "./pages/barang/BarangIndex";
import BarangCreate from "./pages/barang/BarangCreate";
import DetailBarang from "./pages/barang/DetailBarang";
import EditBarang from "./pages/barang/EditBarang";

export default function App() {
  return (
    <BrowserRouter>
      <NavbarComponents />
      <div className="container pt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suplier" element={<SuplierIndex />} />
          <Route path="/suplier/create" element={<SuplierCreate />} />
          <Route path="/suplier/:id" element={<SuplierEdit />} />

          <Route path="/barang" element={<Barang />} />
          <Route path="/barang/:id" element={<DetailBarang />} />
          <Route path="/barang/:id/edit" element={<EditBarang />} />
          <Route path="/barang/create" element={<BarangCreate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
