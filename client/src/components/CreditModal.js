import React from "react";

export default function CreditModal({ isOpen, onClose }) {
  return (
    <div
      className={`credit-modal ${
        isOpen ? "open" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-opacity-80 bg-black flex items-center justify-center`}
    >
      <div className="modal-content bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-[#2d494b] mb-4">Credits</h2>
        <ul className="list-disc pl-4">
          <li className="mb-2">6338200021 - Witsathon Pongkapanakrai</li>
          <li className="mb-2">6438007421 - Krit Chakornsiri</li>
          <li className="mb-2">6438037221 - Chayapa Pongkapanakrai</li>
          <li className="mb-2">6438085321 - Thanakrit Toraninpanich</li>
          <li className="mb-2">6438168821 - Pakkapong Muennikorn</li>
          <li className="mb-2">6438198621 - Wongsapat Arayapipatkul</li>
        </ul>
        <button
          className="close-button bg-[#2d494b] text-white border-none px-4 py-2 rounded cursor-pointer mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
