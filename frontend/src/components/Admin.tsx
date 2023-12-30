import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CreateProblem } from "./CreateProblem";
import { QuizControls } from "./QuizControls";

export const Admin = () => {
  const [socket, setSocket] = useState<null | any>(null);
  const [quizId, setQuizId] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const socket = io("https://quiz-app-pu0u.onrender.com:3000");//io("http://localhost:3000");
    setSocket(socket);
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("joinAdmin", {
        password: "ADMIN_PASSWORD",
      });
    });
  }, []);

  if (!quizId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <input
            className="text-center w-64 p-2 border-2 border-purple-600 rounded-lg shadow-sm focus:outline-none focus:border-purple-800"
            placeholder="Room number"
            type="text"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          />
          <br />
          <br />
          <button
            className="bg-purple-600 text-white w-64 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
            style={{ fontSize: "1rem" }}
            onClick={() => {
              socket.emit("createQuiz", {
                roomId,
              });
              setQuizId(roomId);
            }}
          >
            Create room
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <CreateProblem roomId={quizId} socket={socket} />
        <QuizControls socket={socket} roomId={roomId} />
      </div>
    </div>
  );
};
