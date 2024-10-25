// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import OurCoffee from './components/OurCoffee';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Checkout from './components/Checkout';  // Halaman Checkout

function App() {
  const [orders, setOrders] = useState([]); // State untuk pesanan

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AboutUs />
                <OurCoffee orders={orders} setOrders={setOrders} />
                <ContactUs />
              </>
            }
          />
          <Route path="/checkout" element={<Checkout orders={orders} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
