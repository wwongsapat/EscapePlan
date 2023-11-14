import { socket } from "@/socket";
import React, { useEffect, useRef, useState } from "react";

export default function GameLayout({ roomInfo }) {
  const map = roomInfo.mapInfo.map;
  const moveSoundRef = useRef(null);

  console.log(map);

  function getCellClassName(cell) {
    switch (cell) {
      case 0:
        return "w-20 h-20"; // Set the width and height
      case 1:
        return "w-20 h-20"; // Set the width and height
      case "w":
        return "w-20 h-20"; // Set the width and height
      case "p":
        return "w-20 h-20"; // Set the width and height
      case "h":
        return "w-20 h-20"; // Set the width and height
      default:
        return "";
    }
  }

  function getCellContent(cell) {
    const wardenImage = roomInfo.players.find(
      (p) => p.role === "warden"
    ).picture;

    const prisonerImage = roomInfo.players.find(
      (p) => p.role === "prisoner"
    ).picture;

    switch (cell) {
      case 0:
        return <img src="/images/blank.png" alt="Blank" />; // Replace with the path to your blank.png image
      case 1:
        return <img src="/images/obstacle.png" alt="Obstacle" />; // Replace with the path to your obstacle.png image
      case "w":
        return <img src={wardenImage} alt="Warder" />; // Replace with the path to your warder.png image
      case "p":
        return <img src={prisonerImage} alt="Prisoner" />; // Replace with the path to your prisoner.png image
      case "h":
        return <img src="/images/exit.png" alt="Exit" />; // Replace with the path to your exit.png image
      default:
        return "";
    }
  }

  function whoseTurn() {
    const player = roomInfo.players.find((p) => p.isTurn === true);
    return player;
  }

  function movePlayer(player, columnIndex, rowIndex) {
    const currentIndex = roomInfo.mapInfo.wCoor;
    if (player.role === "warden") {
      if (
        Math.abs(rowIndex - currentIndex[0]) > 1 ||
        Math.abs(columnIndex - currentIndex[1]) > 1
      ) {
        return alert("You can only move to an adjacent block");
      } else {
        if (map[rowIndex][columnIndex] === 1) {
          return alert("You cannot move to an obstacle");
        } else if (map[rowIndex][columnIndex] === "h") {
          return alert("You cannot move to the tunnel box");
        } else if (map[rowIndex][columnIndex] === 0) {
          moveSoundRef.current.play();
          const newMap = map.map((row) => [...row]);
          newMap[currentIndex[0]][currentIndex[1]] = 0;
          newMap[rowIndex][columnIndex] = "w";
          console.log("newmap", newMap);
          const newRoomInfo = {
            ...roomInfo,
            players: roomInfo.players.map((p) => {
              if (p.role === "warden") {
                return { ...p, isTurn: false };
              } else if (p.role === "prisoner") {
                return { ...p, isTurn: true };
              }
            }),
            mapInfo: {
              hCoor: roomInfo.mapInfo.hCoor.map((h) => h),
              pCoor: roomInfo.mapInfo.pCoor.map((p) => p),
              map: newMap,
              wCoor: [rowIndex, columnIndex],
            },
          };
          console.log(player);

          socket.emit("update-position", newRoomInfo);
          console.log("new", newRoomInfo);
        } else if (map[rowIndex][columnIndex] === "p") {
          const newRoomInfo = {
            ...roomInfo,
            players: roomInfo.players.map((p) => {
              if (p.role === "warden") {
                return {
                  ...p,
                  win: true,
                  role: "warden",
                  score: p.score + 100,
                };
              } else if (p.role === "prisoner") {
                return { ...p, win: false, role: "prisoner" };
              }
            }),
          };

          socket.emit("update-position", newRoomInfo);
        }
      }
    } else if (player.role === "prisoner") {
      const currentIndex = roomInfo.mapInfo.pCoor;
      console.log(currentIndex);
      if (
        Math.abs(rowIndex - currentIndex[0]) > 1 ||
        Math.abs(columnIndex - currentIndex[1]) > 1
      ) {
        return alert("You can only move to an adjacent blockkkkk");
      } else {
        if (map[rowIndex][columnIndex] === 1) {
          return alert("You cannot move to an obstacle");
        } else if (map[rowIndex][columnIndex] === "h") {
          const newRoomInfo = {
            ...roomInfo,
            players: roomInfo.players.map((p) => {
              if (p.role === "prisoner") {
                return {
                  ...p,
                  win: true,
                  role: "warden",
                  score: p.score + 100,
                };
              } else if (p.role === "warden") {
                return { ...p, win: false, role: "prisoner" };
              }
            }),
          };

          socket.emit("update-position", newRoomInfo);
        } else if (map[rowIndex][columnIndex] === 0) {
          moveSoundRef.current.play();
          const newMap = map.map((row) => [...row]);
          newMap[currentIndex[0]][currentIndex[1]] = 0;
          newMap[rowIndex][columnIndex] = "p";
          console.log("newmappp", newMap);
          const newRoomInfo = {
            ...roomInfo,
            players: roomInfo.players.map((p) => {
              if (p.role === "prisoner") {
                return { ...p, isTurn: false };
              } else if (p.role === "warden") {
                return { ...p, isTurn: true };
              }
            }),
            mapInfo: {
              hCoor: roomInfo.mapInfo.hCoor.map((h) => h),
              wCoor: [roomInfo.mapInfo.wCoor[0], roomInfo.mapInfo.wCoor[1]],
              map: newMap,
              pCoor: [rowIndex, columnIndex],
            },
          };

          socket.emit("update-position", newRoomInfo);
          console.log("new", newRoomInfo);
        }
      }
    }
  }

  function isMoveValid(player, columnIndex, rowIndex) {
    const currentIndex =
      player.role === "warden"
        ? roomInfo.mapInfo.wCoor
        : roomInfo.mapInfo.pCoor;
    const rowDiff = Math.abs(rowIndex - currentIndex[0]);
    const colDiff = Math.abs(columnIndex - currentIndex[1]);
    return (
      rowDiff <= 1 &&
      colDiff <= 1 &&
      map[rowIndex][columnIndex] !== 1 &&
      map[rowIndex][columnIndex] !== player.role[0]
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1 bg-[#287e28] bg-opacity-60 backdrop-blur-lg p-10 rounded-2xl">
      {map.map((row, rowIndex) => (
        <div key={"r" + rowIndex} className="flex">
          {row.map((cell, columnIndex) => (
            <div
              key={"c" + columnIndex + "" + rowIndex}
              className={getCellClassName(cell)}
            >
              <button
                onClick={() => {
                  const player = whoseTurn();
                  alert(columnIndex + " " + rowIndex);
                  movePlayer(player, columnIndex, rowIndex);
                }}
                className={`relative ${getCellClassName(cell)}`}
                disabled={socket.id !== whoseTurn().id}
              >
                {getCellContent(cell)}
                {isMoveValid(whoseTurn(), columnIndex, rowIndex) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-amber-400 bg-opacity-50">
                    {/* You can add an overlay icon or border here */}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      ))}
      <audio ref={moveSoundRef} hidden>
        <source src="/music/move.m4a" type="audio/mp4" />
      </audio>
    </div>
  );
}
