import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CurrentQuestion } from "./CurrentQuestion";
import { LeaderBoard } from "./LeaderBoard";

export const User = () => {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    if(!submitted){
        return <div>
            Name = <input type="text" placeholder="name" onChange={(e) => {
                setName(e.target.value)
            }}/>
            <br />
            <button onClick={() => {
                setSubmitted(true)
            }}>Submit</button>
        </div>
    }

    return <UserLoggedin name={name}/>
}

export const UserLoggedin = ({name}: {name: string}) => {
    const searchParams = new URLSearchParams(document.location.search);
    const roomId = searchParams.get("roomId");
    const [socket, setSocket] = useState<null | any>(null);
    const [currentState, setCurrentState] = useState("not_started");
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const socket = io('http://localhost:3000');
        setSocket(socket);
        // client-side
        socket.on("connect", () => {
            console.log('socket_id in user: ' + socket.id);
            socket.emit("join",{
                roomId,
                name
            })
        });

        socket.on("init", ({userId, state}) => {
            setUserId(userId);
            if (state.leaderboard) {
                setLeaderboard(state.leaderboard)
            }
            if (state.problem) {
                setCurrentQuestion(state.problem)
            }
            setCurrentState(state.type);
        })
    }, [])

    if(currentState === "not_started"){
        return <div>
            The quiz hasn't started yet
        </div>
    }

    if(currentState === "question"){
        return <CurrentQuestion  question={currentQuestion}/>
    }

    if(currentState === "leaderboard"){
        return <LeaderBoard leaderboard={leaderboard} />
    }


    return <div>
        <br />
        Quiz has ended, thank you!
    </div>
}
