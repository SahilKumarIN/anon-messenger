import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Messages = () => {
  const { id } = useParams();
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);

  return (
    <div className="w-full max-w-lg p-4 bg-slate-500 shadow-md shadow-gray-500 rounded-md mx-auto my-4 md:my-6 lg:my-8">
      <p className="text-center font-bold text-white text-lg md:text-xl">
        {`Compose an <anon-message/> to ${id}`}
      </p>
      <form className="w-full">
        <fieldset className="flex flex-col gap-1 my-4">
          <label
            className="font-bold text-sm md:text-base text-white"
            htmlFor="title"
          >
            Title :
          </label>
          <input
            className="w-full p-1 md:p-2 rounded-md text-sm md:text-base font-semibold outline-none shadow-sm"
            type="text"
            name="title"
            id="title"
            placeholder="Message Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 my-4">
          <label
            className="font-bold text-sm md:text-base text-white"
            htmlFor="message"
          >
            Message :
          </label>
          <textarea
            className="w-full p-1 md:p-2 rounded-md text-sm md:text-base font-semibold outline-none shadow-sm"
            type="text"
            name="message"
            id="message"
            placeholder="compose an anonymous message..."
            rows="10"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </fieldset>
        <button
          className="bg-indigo-300 p-2 md:p-3 rounded shadow-md font-bold text-sm md:text-base text-gray-700 w-full mt-4"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            alert(JSON.stringify({ title, message }));
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;
