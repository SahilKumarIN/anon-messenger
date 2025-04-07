import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDb } from "../context/db-context";
import { useAuth } from "../context/user-auth-context";
import toast from "react-hot-toast";

const Messages = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [roomDetails, setRoomDetails] = useState(null);

  const { createMessage, getRoom } = useDb();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      const resp = await getRoom(id);
      if (!resp) {
        toast.error("No room associated with this ID.");
        navigate("/");
        return;
      }
      setRoomDetails(resp);
    };

    fetchRoom();
  }, [id]);

  const sendMessage = () => {
    if (title.trim() && message.trim()) {
      createMessage(title.trim(), message.trim(), id, user?.$id || null);
      toast.success("Message sent successfully!");
      setTitle("");
      setMessage("");
    } else {
      toast.error("Please fill in both the title and message.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-700 to-slate-900">
      <div className="w-full max-w-2xl bg-slate-600 shadow-lg rounded-lg p-6 sm:p-8 md:p-10">
        <p className="text-center font-bold text-white text-lg sm:text-xl md:text-2xl mb-6">
          {`Compose an <anon-message/> to ${roomDetails?.roomName || "..."}`}
        </p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block font-semibold text-sm sm:text-base text-white mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Message Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-md bg-white text-gray-800 text-sm sm:text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block font-semibold text-sm sm:text-base text-white mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="8"
              placeholder="Compose your anonymous message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-md bg-white text-gray-800 text-sm sm:text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              required
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            onClick={sendMessage}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-md text-sm sm:text-base shadow-md transition transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
