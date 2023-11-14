"use client";
import GameLayout from "@/components/GameLayout";
import { socket } from "@/socket";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StoryModal from "@/components/StoryModal";

export default function GamePage() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("roomCode");
  const [roomInfo, setRoomInfo] = useState({});
  const [time, setTime] = useState(3);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

  const router = useRouter();

  const openCreditModal = () => {
    setIsCreditModalOpen(true);
  };

  const closeCreditModal = () => {
    setIsCreditModalOpen(false);
  };

  function whoseTurn() {
    const player = roomInfo.players.find((p) => p.isTurn === true);
    return player;
  }

  useEffect(() => {
    socket.emit("start-game", roomCode);
    console.log(roomInfo);
  }, []);

  useEffect(() => {
    socket.on("update-room", (roomInfo) => {
      setRoomInfo(roomInfo);
      console.log("update", roomInfo);
    });

    return () => {
      socket.off("update-room");
    };
  }, [setRoomInfo]);

  useEffect(() => {
    let intId;
    if (!roomInfo.players || !roomInfo.mapInfo) return;

    if (roomInfo.players.find((p) => p.win === true)) {
      intId = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        const player = roomInfo.players.find((p) => p.id === socket.id);
        window.location.href = `/room/relobby?roomCode=${roomCode + 1}&name=${
          player.name
        }&pic=${player.picture}&score=${player.score}&role=${player.role}`;
      }, 3000);
    }
  }, [roomInfo]);

  if (!roomInfo.players || !roomInfo.mapInfo) return <p>Loading</p>;

  if (roomInfo.players.find((p) => p.win === true)) {
    return (
      <>
        <div>{`Winner is ${
          roomInfo.players.find((p) => p.win === true).name
        }`}</div>
        <div>{`Score is ${
          roomInfo.players.find((p) => p.win === true).score
        }`}</div>
        <h1 className="text-2xl mt-8">{`Game will start in ${time} seconds`}</h1>
      </>
    );
  }

  return (
    <div className="relative p-10">
      <Link href="/" className="absolute">
        back
      </Link>
      <button
        className="bg-[#0f464a] absolute bottom-10 left-10 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-[#2b8c90] transition-colors duration-300"
        onClick={openCreditModal}
      >
        Story
      </button>
      <div className="flex justify-center items-center h-screen gap-10">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg p-10 rounded-lg">
          <div className="text-center">
            Time: {roomInfo.timer} seconds left
            <h1 className="text-lg font-bold">{`Player ${roomInfo.players[0].name}`}</h1>
            <Image
              src={roomInfo.players[0].picture}
              alt={`${roomInfo.players[0].name}'s pic`}
              width={100}
              height={100}
              className="mt-4 mx-auto"
            />
            <h2 className="text-sm text-gray-600">{`Role: ${roomInfo.players[0].role}`}</h2>
            {socket.id === whoseTurn().id &&
              whoseTurn().role === roomInfo.players[0].role && (
                <h3>Your turn</h3>
              )}
          </div>
        </div>
        <GameLayout roomInfo={roomInfo} className="flex-grow" />
        <div className="bg-white bg-opacity-80 backdrop-blur-lg p-10 rounded-lg">
          <div className="text-center">
            <h1 className="text-lg font-bold">{`Player ${roomInfo.players[1].name}`}</h1>
            <Image
              src={roomInfo.players[1].picture}
              alt={`${roomInfo.players[1].name}'s pic`}
              width={100}
              height={100}
              className="mt-4 mx-auto"
            />
            <h2 className="text-sm text-gray-600">{`Role: ${roomInfo.players[1].role}`}</h2>
            {socket.id === whoseTurn().id &&
              whoseTurn().role === roomInfo.players[1].role && (
                <h3>Your turn</h3>
              )}
          </div>
        </div>
      </div>
      <StoryModal isOpen={isCreditModalOpen} onClose={closeCreditModal} />
    </div>
  );
}
