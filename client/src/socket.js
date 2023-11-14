import io from "socket.io-client";

export const socket = io("http://localhost:4000");

socket.on("reset", () => {
  window.location.href = "/";
});
