import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDb } from "../context/db-context";
import { useAuth } from "../context/user-auth-context";
import toast from "react-hot-toast";

const Messages = () => {
  const { id } = useParams();
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);

  const { createMessage, getRoom } = useDb();
  const { user } = useAuth();

  const navigator = useNavigate();

  useEffect(async () => {
    const resp = await getRoom(id);
    if (resp === null || resp === undefined) {
      navigator("/");
      toast.error("No room associated with this id.");
    }
    // console.log(resp);
    setRoomDetails(resp);
  }, []);

  function sendMessage() {
    if (title !== null && message !== null) {
      createMessage(title, message, id, user.$id);
    } else {
      toast.error("Details are empty!!!");
    }
  }

  return (
    <div className="w-full max-w-lg p-4 bg-slate-500 shadow-md shadow-gray-500 rounded-md mx-auto my-4 md:my-6 lg:my-8">
      <p className="text-center font-bold text-white text-lg md:text-xl">
        {`Compose an <anon-message/> to ${roomDetails?.roomName}`}
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
            sendMessage();
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;
