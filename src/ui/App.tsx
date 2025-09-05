// import { useState } from 'react'
import "../index.css";
import { About } from "./About";
import { HomePage } from "./Home";
import { Routes, Route, Link } from "react-router";
import { NotFoundPage } from "./notfound";
import { DetailProduct } from "./detailProduk";
import { Produk } from "./produk";
import { Contact } from "./contact";
import { EmployeesPage } from "./fetchEmployees";
import { AxiosAPI } from "./axios";


export default function App() {
  return (
    <>
    <div className="pb-40 pt-10">
      <ul className="list-none flex flex-row gap-5 text-2xl font-bold">
        <li>
          <Link to="/" >Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/employees'>Employees</Link>
        </li>
        <li>
          <Link to='/product'>Product</Link>
        </li>
        <li>
          <Link to='/tryaxios'>Axios</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </ul>
    </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Produk />} />
        <Route path="/product/detailproduk/:id" element={<DetailProduct />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/tryaxios" element={<AxiosAPI />} />
      </Routes>
    </>
  );
}
