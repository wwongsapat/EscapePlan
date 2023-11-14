import { createServer } from "node:http";

import cors from "cors";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const port = 4000; // Port number you want to use
const ip = "localhost"; // 172.20.10.9  localhost

export const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

let rooms = [];

app.get("/admin", (req, res) => {
  res.send(
    "Online players: " + io.of("/").sockets.size + "<a href='/reset'>Reset</a>"
  );
});

app.get("/reset", (req, res) => {
  rooms = [];
  io.emit("reset");
  res.redirect("/admin");
  io.disconnectSockets();
});

function randomRole() {
  const roles = ["warden", "prisoner"];
  return roles[Math.floor(Math.random() * roles.length)];
}

const timeouts = {};

const generateMap = () => {
  const nigger = [
    //0
    [
      [
        [0, 0, 0, 0, "h"],
        ["p", 1, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 1, 0, "w"],
        [0, 0, 0, 0, 0],
      ],
      [1, 0],
      [3, 4],
      [0, 4],
    ],
    //1
    [
      [
        [1, 1, 0, 0, "w"],
        [0, 0, 0, 1, 0],
        ["p", 1, 0, 0, 0],
        [0, 1, 0, "h", 0],
        [0, 0, 0, 0, 0],
      ],
      [2, 0],
      [0, 4],
      [3, 3],
    ],
    //2
    [
      [
        [0, "p", 0, 1, 0],
        [1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        ["h", 0, 0, 1, 0],
        [0, 0, 0, "w", 0],
      ],
      [0, 1],
      [4, 3],
      [3, 0],
    ],
    //3
    [
      [
        ["w", 0, 0, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 0, "h", 0, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 0, 0, "p"],
      ],
      [4, 4],
      [0, 0],
      [2, 2],
    ],
    //4
    [
      [
        [0, 1, 0, 0, 0],
        ["p", 0, 0, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, "h", 1, "w"],
        [0, 0, 0, 0, 0],
      ],
      [1, 0],
      [3, 4],
      [3, 2],
    ],
    //5
    [
      [
        [1, 0, 0, 0, 0],
        [1, 0, 0, "h", 0],
        [0, 0, 0, 0, 1],
        ["p", 1, 1, 0, 0],
        [0, 0, 0, 0, "w"],
      ],
      [3, 0],
      [4, 4],
      [1, 3],
    ],
    //6
    [
      [
        ["w", 0, 1, 0, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 1, 0, "p"],
        [0, 0, 1, 0, 0],
        ["h", 0, 0, 0, 1],
      ],
      [2, 4],
      [0, 0],
      [4, 0],
    ],
    //7
    [
      [
        [1, 0, 0, 0, 0],
        [1, 0, "h", 0, 0],
        [0, 0, 0, 1, "w"],
        [0, 0, 0, 1, 0],
        ["p", 1, 0, 0, 0],
      ],
      [4, 0],
      [2, 4],
      [1, 2],
    ],
    //8
    [
      [
        ["p", 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, "h", 0, 0],
        [0, 1, 1, 1, 0],
        ["w", 0, 0, 0, 0],
      ],
      [0, 0],
      [4, 0],
      [2, 2],
    ],
    //9
    [
      [
        [1, 0, "h", 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 0, "w"],
        ["p", 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
      ],
      [3, 0],
      [2, 4],
      [0, 2],
    ],
    //10
    [
      [
        [1, 0, 0, 0, 0],
        [0, "w", 0, 1, 0],
        [0, "h", 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 1, 0, "p", 1],
      ],
      [4, 3],
      [1, 1],
      [2, 1],
    ],
  ];
  let random = Math.floor(Math.random() * 11);

  return {
    id: random,
    map: nigger[random][0],
    pCoor: nigger[random][1],
    wCoor: nigger[random][2],
    hCoor: nigger[random][3],
  };
};

io.on("connection", (socket) => {
  socket.on("ready", (name) => {
    socket.emit("hi", `hello ${name}`);
  });
  socket.on("create-room", (room) => {
    rooms.push({
      roomCode: room.roomCode,
      players: [
        {
          name: room.players[0].name,
          picture: room.players[0].picture,
          id: socket.id,
          score: room.players[0].score,
          role: room.role ?? randomRole(),
        },
      ],
    });

    socket.join(room.roomCode);
  });

  socket.on("join-room", (room) => {
    const roomToJoin = rooms.find((r) => r.roomCode === room.roomCode);
    if (roomToJoin) {
      roomToJoin.players.push({
        name: room.players[0].name,
        picture: room.players[0].picture,
        id: socket.id,
        score: room.players[0].score,
        role: roomToJoin.players[0].role === "warden" ? "prisoner" : "warden",
      });
    }

    socket.join(room.roomCode);

    io.to(room.roomCode).emit("update-room", roomToJoin);
  });

  socket.on("ask-join", (roomCode, callback) => {
    callback(rooms.find((r) => r.roomCode === roomCode));
  });

  socket.on("start-game", (roomCode) => {
    const room = rooms.find((r) => r.roomCode === roomCode);

    io.to(roomCode).emit("update-room", room);
    if (room.mapInfo) return;

    const map = generateMap();
    room.mapInfo = map;
    room.timer = 10;

    room.players.forEach((p) => {
      p.win = false;
    });

    const wardenPlayer = room.players.find((p) => p.role === "warden");
    const prisonerPlayer = room.players.find((p) => p.role === "prisoner");

    wardenPlayer.isTurn = true;
    prisonerPlayer.isTurn = false;

    console.log(room);

    timeouts[roomCode] = startTimer(roomCode);
  });

  function startTimer(roomCode) {
    return setInterval(() => {
      const room = rooms.find((r) => r.roomCode === roomCode);
      if (room.timer === 0) {
        clearInterval(timeouts[roomCode]);

        const wardenPlayer = room.players.find((p) => p.role === "warden");
        const prisonerPlayer = room.players.find((p) => p.role === "prisoner");
        wardenPlayer.isTurn = !wardenPlayer.isTurn;
        prisonerPlayer.isTurn = !prisonerPlayer.isTurn;

        room.timer = 10;
        timeouts[roomCode] = startTimer(roomCode);

        io.to(roomCode).emit("update-room", room);
        return;
      }
      room.timer--;
      console.log("a", room);
      io.to(roomCode).emit("update-room", room);
    }, 1000);
  }

  socket.on("update-position", (roomInfo) => {
    const room = rooms.find((r) => r.roomCode === roomInfo.roomCode);
    room.players = roomInfo.players;
    room.mapInfo = roomInfo.mapInfo;

    clearInterval(timeouts[room.roomCode]);
    room.timer = 10;
    timeouts[room.roomCode] = startTimer(room.roomCode);

    io.to(roomInfo.roomCode).emit("update-room", room);
  });
});

server.listen(port, ip, () => {
  console.log(`Server started: http://${ip}:4000`);
});
