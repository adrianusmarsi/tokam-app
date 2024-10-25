// src/components/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

function Checkout({ orders }) {
  const menu = [
    { name: 'Espresso', price: 20000 },
    { name: 'Cappuccino', price: 25000 },
    { name: 'Latte', price: 30000 }
  ];

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null); // Menyimpan metode pembayaran yang dipilih
  const total = orders.reduce((acc, count, index) => acc + count * menu[index].price, 0);

  // Fungsi untuk mencetak struk dalam bentuk PDF
  const printReceipt = () => {
    const doc = new jsPDF();
    doc.text("Struk Pembayaran - JavaBeans Coffee Shop", 10, 10);
    orders.forEach((order, index) => {
      if (order > 0) {
        doc.text(
          `${menu[index].name}: ${order} x Rp ${menu[index].price.toLocaleString()} = Rp ${(order * menu[index].price).toLocaleString()}`,
          10,
          20 + index * 10
        );
      }
    });
    doc.text(`Total: Rp ${total.toLocaleString()}`, 10, 20 + orders.length * 10);
    doc.save("Struk_Pembayaran.pdf"); // Simpan sebagai PDF
  };

  // Fungsi untuk mencetak bukti pembayaran QRIS dalam bentuk PDF
  const printQrisReceipt = () => {
    const doc = new jsPDF();
    doc.text("Bukti Pembayaran QRIS - JavaBeans Coffee Shop", 10, 10);
    doc.text(`Total Pembayaran: Rp ${total.toLocaleString()}`, 10, 20);
    doc.text("Silakan tunjukkan bukti ini di kasir.", 10, 30);
    doc.save("Bukti_Pembayaran_QRIS.pdf");
  };

  const handleConfirmPayment = () => {
    if (paymentMethod === "qris") {
      printQrisReceipt();
    } else if (paymentMethod === "cashier") {
      printReceipt();
    }
    navigate('/'); // Kembali ke halaman utama setelah pembayaran
  };

  return (
    <section id="checkout">
      <h2>Checkout</h2>
      <div className="checkout-items">
        {orders.map((order, index) => (
          order > 0 && (
            <div key={index} className="checkout-item">
              <h3>{menu[index].name}</h3>
              <p>Jumlah: {order}</p>
              <p>Harga: Rp {(order * menu[index].price).toLocaleString()}</p>
            </div>
          )
        ))}
      </div>
      <h3>Total: Rp {total.toLocaleString()}</h3>

      {/* Pilihan metode pembayaran */}
      <div className="payment-options">
        <h4>Pilih Metode Pembayaran:</h4>
        <button onClick={() => setPaymentMethod("qris")}>QRIS</button>
        <button onClick={() => setPaymentMethod("cashier")}>Bayar di Kasir</button>
      </div>

      {/* Tombol Konfirmasi atau Batal */}
      <div className="checkout-actions">
        <button className="cancel-button" onClick={() => navigate('/')}>Batal / Kembali</button>
        <button
          className="confirm-button"
          onClick={handleConfirmPayment}
          disabled={!paymentMethod} // Disabled jika belum memilih metode pembayaran
        >
          Konfirmasi Pembayaran
        </button>
      </div>
    </section>
  );
}

export default Checkout;
