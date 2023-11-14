"use client";
import BackgroundImageModal from "@/components/BackgroundImageModal";
import CreditModal from "@/components/CreditModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const openCreditModal = () => {
    setIsCreditModalOpen(true);
  };

  const closeCreditModal = () => {
    setIsCreditModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackgroundChange = (newBackgroundImage) => {
    document.documentElement.style.setProperty(
      "--background-image",
      `url(${newBackgroundImage})`
    );
    closeModal();
  };

  return (
    <div className="relative">
      <button
        className="absolute top-[100px] right-10 text-white cursor-pointer"
        onClick={toggleMute}
      >
        {isMuted ? (
          <Image
            src="/images/unmute.png"
            alt="Unmute"
            width={50}
            height={50}
            className="rounded-full bg-white "
          />
        ) : (
          <Image src="/images/mute.png" alt="Mute" width={50} height={50} />
        )}
      </button>

      {isMuted ? null : (
        <audio autoPlay loop>
          <source src="/music/bg.m4a" type="audio/mp4" />
          Your browser does not support the audio element.
        </audio>
      )}

      <Image
        src="/images/gear.png"
        alt="gear"
        width={50}
        height={50}
        className="absolute top-10 right-10 cursor-pointer"
        onClick={openModal}
      />
      <button
        className="bg-[#0f464a] absolute bottom-10 left-10 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-[#2b8c90] transition-colors duration-300"
        onClick={openCreditModal}
      >
        Credit
      </button>

      <BackgroundImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onBackgroundChange={handleBackgroundChange}
      />

      <CreditModal isOpen={isCreditModalOpen} onClose={closeCreditModal} />
      <div className="grid  place-content-center place-items-center h-screen">
        <Image
          src="/images/Logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mb-8"
        />
        <div className="flex flex-col gap-5">
          <Link
            href="/user"
            className="inline-flex items-center justify-center w-[350px] h-16 px-10 text-2xl font-semibold text-white no-underline rounded-full bg-[#2d494b] cursor-pointer select-none hover:bg-[#2b8c90] transition-colors duration-300 ease-in-out"
          >
            Play
          </Link>

          <Link
            href="/instruction"
            className="inline-flex items-center justify-center w-[350px] h-16 px-10 text-2xl font-semibold text-white no-underline rounded-full bg-[#2d494b] cursor-pointer select-none hover:bg-[#2b8c90] transition-colors duration-300 ease-in-out"
          >
            Instruction
          </Link>
        </div>
      </div>
      <a
        href="http://www.ise.eng.chula.ac.th"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/ad.jpg"
          alt="ad"
          width={700}
          height={200}
          className="absolute bottom-0 right-0 cursor-pointer"
        />
      </a>
    </div>
  );
}
