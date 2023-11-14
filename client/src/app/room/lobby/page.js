"use client";
import Image from "next/image";
import { socket } from "@/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LobbyPage() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("roomCode");
  const [roomInfo, setRoomInfo] = useState({});
  const [time, setTime] = useState(3);
  const router = useRouter();
  const started = useRef(false);

  useEffect(() => {
    let intId;
    socket.emit("ask-join", roomCode, (roomInfo) => {
      setRoomInfo(roomInfo);
      if (roomInfo.players.length === 2 && !started.current) {
        started.current = true;
        intId = setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000);
        setTimeout(() => {
          router.push(`/room/game?roomCode=${roomCode}`);
        }, 3000);
      }
      console.log(roomInfo);
    });
    return () => {
      clearInterval(intId);
      socket.off("ask-join");
    };
  }, [roomCode, router]);

  useEffect(() => {
    let intId;
    socket.on("update-room", (roomInfo) => {
      setRoomInfo(roomInfo);
      if (roomInfo.players.length === 2 && !started.current) {
        started.current = true;
        intId = setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000);
        setTimeout(() => {
          router.push(`/room/game?roomCode=${roomCode}`);
        }, 3000);
      }
    });
    return () => {
      clearInterval(intId);
      socket.off("update-room");
    };
  }, [roomCode, router]);

  if (!roomInfo.players) return <p>Loading</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Lobby</h1>
      <h2 className="text-2xl">{`Room code: ${roomCode}`}</h2>
      <div className="flex mt-8 gap-6">
        <div className="bg-[#d37755] p-7 rounded-xl flex flex-col justify-center items-center">
          <h1 className="text-2xl">{`Player 1: ${roomInfo.players[0].name}`}</h1>
          <Image
            src={roomInfo.players[0].picture}
            alt={`${roomInfo.players[0].name}'s pic`}
            width={100}
            height={100}
            className="mt-4"
          />
        </div>
        {roomInfo.players.length > 1 && (
          <div className="bg-[#3b6b58] p-7 rounded-xl flex flex-col justify-center items-center">
            <h1 className="text-2xl">{`Player 2: ${roomInfo.players[1].name}`}</h1>
            <Image
              src={roomInfo.players[1].picture}
              alt={`${roomInfo.players[1].name}'s pic`}
              width={100}
              height={100}
              className="mt-4"
            />
          </div>
        )}
      </div>
      {roomInfo.players.length === 2 && (
        <>
          <h1 className="text-2xl mt-8">Welcome all players</h1>
          <h1 className="text-2xl mt-8">{`Game will start in ${time} seconds`}</h1>
        </>
      )}
    </div>
  );
}
