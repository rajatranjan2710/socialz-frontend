// // store/socketStore.js
// import { create } from "zustand";
// import { io } from "socket.io-client";

// const useSocketStore = create((set) => ({
//   socket: null,
//   connectSocket: (userId) => {
//     // if (state.socket) return;
//     const socket = io("https://socialite-backend.vercel.app", {
//       query: { userId},
//       transports: ["websocket"],
//       withCredentials: true
//     });
//     socket.on("connect", () => {
//       console.log("connected");
//     });
//     set({ socket });
//   },
//   disconnectSocket: () => {
//     set((state) => {
//       if (state.socket) {
//         state.socket.disconnect();
//       }
//       return { socket: null };
//     });
//   },
// }));

// export default useSocketStore;


import { create } from "zustand";
import { io } from "socket.io-client";

const useSocketStore = create((set, get) => ({
  socket: null,
  connectSocket: (userId) => {
    // Check if socket is already connected
    if (get().socket) return; // Prevent multiple connections

    const socket = io("https://socialite-backend.vercel.app", {
      query: { userId },
      transports: ["websocket"],
      withCredentials: true, // Allows cookies to be sent with requests
    });

    // Set up socket event listeners
    socket.on("connect", () => {
      console.log("Connected to the socket.");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected.");
    });

    set({ socket });
  },
  disconnectSocket: () => {
    set((state) => {
      if (state.socket) {
        state.socket.disconnect();
        console.log("Disconnected from the socket.");
      }
      return { socket: null };
    });
  },
}));

export default useSocketStore;

