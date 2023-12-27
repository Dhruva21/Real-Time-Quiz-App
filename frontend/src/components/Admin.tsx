import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client/debug";
import { CreateProblem } from "./CreateProblem";

export const Admin = () => {
    const [socket, setSocket] = useState<null | any>(null);
    const [quizId, setQuizId] = useState("");
    const [roomId, setRoomId] = useState("");
    useEffect(() => {
        const socket = io('http://localhost:3000');
        setSocket(socket);
        // client-side
        socket.on("connect", () => {
            console.log(socket.id);
            socket.emit("joinAdmin",{
                password: "ADMIN_PASSWORD"
            })
        });
    }, [])

    if(!quizId){
        return <div>
        <input type="test" onChange={(e) =>{
            setRoomId(e.target.value)
        }} />
        <br /> <br />
        <button onClick={() => {
            socket.emit("createQuiz");
            setQuizId(roomId)
        }}>Create Room</button>
    </div>
    }else{
        return <CreateProblem socket={socket} />
    }
    
}