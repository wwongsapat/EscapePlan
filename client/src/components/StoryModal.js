import React from "react";
import Image from "next/image";

export default function StoryModal({ isOpen, onClose }) {
  return (
    <div className={`story-modal ${isOpen ? "open" : "hidden"}`}>
      <div className="modal-content bg-white p-6 rounded-lg shadow-md">
        <div className="p-[140px]">
          <Image
            src="/images/story.png"
            alt="story"
            width={1920}
            height={1080}
          />
        </div>
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
