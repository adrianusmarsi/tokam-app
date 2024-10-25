// src/components/OurCoffee.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import './OurCoffee.css';

function OurCoffee({ orders, setOrders }) {
  const menu = [
    { name: 'Espresso', price: 20000, image: '/images/kopsu-sederhana.jpg' },
    { name: 'Cappuccino', price: 25000, image: '/images/cappuccino.jpg' },
    { name: 'Latte', price: 30000, image: '/images/latte.jpg' }
  ];

  const [errors, setErrors] = useState(menu.map(() => '')); // State untuk pesan kesalahan
  const navigate = useNavigate(); // Inisialisasi useNavigate untuk routing

  const handleOrderChange = (index, value) => {
    const newOrders = [...orders];
    const newErrors = [...errors];
    
    // Validasi input
    if (isNaN(value) || value === '') {
      newErrors[index] = 'Jumlah harus berupa angka';
    } else if (value < 0) {
      newErrors[index] = 'Jumlah tidak boleh negatif';
    } else {
      newErrors[index] = '';
    }

    newOrders[index] = value >= 0 ? value : 0; // Pastikan nilai tidak negatif
    setOrders(newOrders);
    setErrors(newErrors);
  };

  const total = orders.reduce((acc, count, index) => acc + count * menu[index].price, 0); // Hitung total harga
  const hasErrors = errors.some(error => error !== ''); // Cek jika ada kesalahan input
  const noOrders = orders.every(order => order === 0);  // Cek jika tidak ada pesanan

  const handleSubmit = () => {
    navigate('/checkout'); // Pindah ke halaman checkout
  };

  return (
    <section id="menu">
      <h2>Our Coffee</h2>
      <div className="menu-items">
        {menu.map((item, index) => (
          <div key={index} className="menu-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Rp {item.price.toLocaleString()}</p>
            <input
              type="number"
              min="0"
              value={orders[index]}
              onChange={(e) => handleOrderChange(index, e.target.value)}
            />
            {errors[index] && <p className="error">{errors[index]}</p>} {/* Tampilkan pesan kesalahan */}
          </div>
        ))}
      </div>
      <h3>Total: Rp {total.toLocaleString()}</h3>

      <button
        className="order-button"
        onClick={handleSubmit}
        disabled={hasErrors || noOrders}
      >
        Pesan Sekarang
      </button>
    </section>
  );
}

export default OurCoffee;
