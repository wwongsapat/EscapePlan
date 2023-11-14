"use client";
import { socket } from "@/socket";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function MainMenuPage() {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const pic = searchParams.get("pic");

  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const makeId = () => {
    const result = Math.random().toFixed(4).slice(2, 6);
    return result;
  };

  const handleCreate = () => {
    console.log(name, pic);
    const roomCode = makeId();
    socket.emit("create-room", {
      roomCode: roomCode,
      players: [{ name: name, picture: pic, score: 0 }],
    });
    router.push(`/room/lobby?roomCode=${roomCode}`);
  };

  const handleInput = (e) => {
    e.preventDefault();
    setRoomCode(e.target.value);
  };

  const handleJoin = () => {
    socket.emit("join-room", {
      roomCode: roomCode,
      players: [{ name: name, picture: pic, score: 0 }],
    });
    router.push(`/room/lobby?roomCode=${roomCode}`);
  };

  return (
    <div className="relative p-10">
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
      <Link href="/" className="absolute">
        back
      </Link>
      <div className="gap-8 p-[100px] flex place-content-center place-items-center h-screen">
        <div className="flex flex-col gap-5 justify-center place-items-center rounded-xl bg-amber-200 p-4 w-full h-full">
          <h1>Create Room</h1>
          <div className="relative inline-block px-4 py-2 font-medium group">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <button
              onClick={handleCreate}
              className="relative text-black group-hover:text-white"
            >
              Create
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-center place-items-center rounded-xl bg-amber-200 p-4 w-full h-full">
          <h1>Join Room</h1>
          <input
            type="text"
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) => handleInput(e)}
            className="py-2 px-3 bg-transparent border-2 border-gray-500 rounded-md text-gray-900 placeholder-gray-500 hover:bg-white hover:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:placeholder-gray-400 transition-all duration-300 ease-in-out"
          />
          <div className="relative inline-block px-4 py-2 font-medium group">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <button
              onClick={handleJoin}
              className="relative text-black group-hover:text-white"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
