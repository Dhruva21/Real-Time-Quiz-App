import { useState } from "react"

export const CreateProblem = ({socket}: {socket: any}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [options, setOptions] =  useState([
        {
            id: 0,
            title: ""
        },
        {
            id: 1,
            title: ""
        },
        {
            id: 2,
            title: ""
        },
        {
            id: 3,
            title: ""
        }
    ])
    return <div>
        Create problem
        <input type="text" onChange={(e) => {
            setTitle(e.target.value)
        }} />
        <br />
        <br />
        {[0,1,2,3].map(optionId =>
            <div>
                Option {optionId}
                <input type="text" onChange={(e) => {
                    setOptions(options => options.map(x => {
                        if(x.id === optionId){
                            return {
                                ...x,
                                title: e.target.value
                            }
                        }
                        return x;
                    }))
                }} 
                />
            <br />

            </div>
        )}

        <br />
        <button onClick={() => {
            socket.emit("createProblem", {
                roomId,
                problem:{
                    title,
                    options
                }
            });
        }}>Add problem</button>
    </div>
}