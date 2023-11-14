import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
  },
};

const BackgroundImageModal = ({
  isOpen,
  onRequestClose,
  onBackgroundChange,
}) => {
  const backgroundImageOptions = [
    "/images/bg1.png",
    "/images/bg2.jpg",
    "/images/bg3.jpg",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Background Image Modal"
      style={customStyles}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold my-5">Choose a Background Image</h2>
        <div className="grid grid-cols-2 gap-4">
          {backgroundImageOptions.map((bgImage, index) => (
            <button
              key={index}
              onClick={() => onBackgroundChange(bgImage)}
              className="border border-gray-300 rounded-md p-4 w-full text-center cursor-pointer transform transition-transform hover:scale-105"
            >
              <img
                src={bgImage}
                alt={`Background ${index}`}
                className="w-full h-auto"
              />
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default BackgroundImageModal;
