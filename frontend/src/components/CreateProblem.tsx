import { useState } from "react";

export const CreateProblem = ({ socket, roomId }: { socket: any; roomId: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState(0);
  const [options, setOptions] = useState([
    { id: 0, title: "" },
    { id: 1, title: "" },
    { id: 2, title: "" },
    { id: 3, title: "" },
  ]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 text-xl font-bold pl-16 ml-6">Create Problem</div>

        {/* Title input */}
        <div className="mb-4">
          <label htmlFor="title" >
            Title:
          </label>{' '}
          <input
            id="title"
            className="text-center w-64 p-2 border-2 border-purple-600 rounded-lg shadow-sm focus:outline-none focus:border-purple-800"
            placeholder="Problem Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description input */}
        <div className="mb-4">
          <label htmlFor="description">
            Description:
          </label>{' '}
          <input
            id="description"
            className="text-center w-64 p-2 border-2 border-purple-600 rounded-lg shadow-sm focus:outline-none focus:border-purple-800"
            placeholder="Problem Description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Options and Answers */}
        {[0, 1, 2, 3].map((optionId) => (
          <div key={optionId} className="mb-4">
            <input
              type="radio"
              checked={optionId === answer}
              onChange={() => setAnswer(optionId)}
            />
            <label htmlFor={`option-${optionId}`} className="ml-2">
              Option {optionId}{' '}
            </label>
            <input
              id={`option-${optionId}`}
              type="text" className="text-center w-64 p-2 border-2 black rounded-lg shadow-sm focus:outline-none focus:border-purple-800"
              placeholder="Answer"
              onChange={(e) =>
                setOptions((options) =>
                  options.map((x) =>
                    x.id === optionId
                      ? { ...x, title: e.target.value }
                      : x
                  )
                )
              }
            />
          </div>
        ))}

        {/* Add problem button */}
        <button
          className="bg-purple-600 text-white w-64 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
          style={{ fontSize: "1rem" }}
          onClick={() => {
            socket.emit("createProblem", {
              roomId,
              problem: {
                title,
                description,
                options,
                answer,
              },
            });
          }}
        >
          Add Problem
        </button>
      </div>
    </div>
  );
};
