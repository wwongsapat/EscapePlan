"use client";
import Image from "next/image";
import { socket } from "@/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReLobbyPage() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("roomCode");
  const name = searchParams.get("name");
  const pic = searchParams.get("pic");
  const score = searchParams.get("score");
  const role = searchParams.get("role");
  const [roomInfo, setRoomInfo] = useState({});
  const [time, setTime] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const room = {
      roomCode: roomCode,
      players: [{ name: name, picture: pic, score: score, role: role }],
    };
    if (role === "warden") {
      socket.emit("create-room", room);
    } else if (role === "prisoner") {
      setTimeout(() => {
        socket.emit("join-room", room);
      }, 1000);
    }
    setTimeout(() => {
      socket.emit("start-game", roomCode);
      router.push(`/room/game?roomCode=${roomCode}`);
    }, 3000);
  }, [name, pic, role, roomCode, router, score]);

  return null;
}
