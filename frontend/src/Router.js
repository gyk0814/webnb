import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailPage from './pages/DetailPage/DetailPage';
import Navbar from './components/Navbar/Navbar';
import Main from './pages/Main/Main';
import WireFrame from './components/Navbar/WireFrame';
import Footer from './components/Footer/Footer';
import Payment from './pages/Payment/Payment';
import PayDone from './pages/PayDone/PayDone';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <WireFrame />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/payment/list" element={<Payment />} />
        <Route path="/paydone" element={<PayDone />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
