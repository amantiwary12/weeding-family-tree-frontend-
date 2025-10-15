// 📄 src/components/PayWithGPay.jsx
import React from "react";

const PayWithGPay = () => {
  const upiLink = "upi://pay?pa=amantiwary2505@okhdfcbank&pn=Aman%20Tiwary&cu=INR";

  const handlePayClick = () => {
    window.location.href = upiLink;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/gpay-qr.png"
        alt="Pay via Google Pay"
        className="w-44 h-44 mx-auto rounded-xl shadow-md cursor-pointer transition hover:scale-105"
        onClick={handlePayClick}
      />

      <p className="mt-2 text-gray-600 text-sm text-center">
        Scan or tap to pay securely using UPI
      </p>

      <button
        onClick={handlePayClick}
        className="mt-3 bg-blue-600 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-blue-700 transition"
      >
        💸 Pay with GPay / UPI
      </button>
    </div>
  );
};

export default PayWithGPay;
