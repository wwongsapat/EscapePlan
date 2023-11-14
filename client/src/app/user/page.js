"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function User() {
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [selectedPic, setSelectedPic] = useState(null);
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (name) {
      queryParams.set("name", name);
    }
    if (pic) {
      queryParams.set("pic", pic);
    }
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [name, pic]);

  const handleClick = (src) => {
    setPic(src);
    setSelectedPic(src);
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();
    if (name) {
      queryParams.set("name", name);
    }
    if (pic) {
      queryParams.set("pic", pic);
    }
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, "", newUrl);

    if (name && pic) {
      router.push(`/room?${queryParams.toString()}`, { shallow: true });
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute top-10 right-10 text-white cursor-pointer"
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
      <div className="flex flex-col gap-5 items-center justify-center h-screen">
        <Link href="/">
          <Image src="/images/Logo.png" alt="Logo" width={200} height={200} />
        </Link>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="py-2 px-3 bg-transparent border-2 border-gray-500 rounded-md text-gray-900 placeholder-gray-500 hover:bg-white hover:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold my-2 self-center">
            Choose your profile picture
          </h1>
          <div className="flex space-x-4 my-2">
            {[
              "/images/mouse.png",
              "/images/fox.png",
              "/images/chicken.png",
              "/images/cow.png",
            ].map((src) => (
              <div
                key={src}
                onClick={() => handleClick(src)}
                className={`relative cursor-pointer ${
                  selectedPic === src
                    ? "transform scale-105 rounded-md border-4 border-purple-500"
                    : "hover:transform scale-110 rounded-md border-4 border-transparent hover:border-purple-500"
                } transition-transform duration-300`}
              >
                <Image
                  src={src}
                  alt="profile"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                {selectedPic === src && (
                  <div className="absolute inset-0 flex items-center justify-center bg-purple-500 bg-opacity-70 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          className="py-2 px-4 mt-4 bg-purple-500 text-white rounded-md hover:bg-purple-700 transition-all duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
