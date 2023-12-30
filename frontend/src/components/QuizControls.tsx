export const QuizControls = ({socket, roomId}: {socket: any, roomId: string}) => {
    return <div>
        Quiz controls
        <button className="bg-purple-600 text-white w-64 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
            style={{ fontSize: "1rem" }}
            onClick={() => {
            socket.emit("next", {
                roomId
            })
        }}>Next problem</button>
    </div>
}