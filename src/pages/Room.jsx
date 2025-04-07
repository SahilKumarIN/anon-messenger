import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDb } from "../context/db-context";
import Message from "../components/Message";

const Room = () => {
  const { roomId } = useParams();
  const { getRoom, getRoomMessages } = useDb();
  const [roomDetails, setRoomDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const details = await getRoom(roomId);
        setRoomDetails(details);

        const msgs = await getRoomMessages(roomId);
        setMessages(msgs);
      } catch (error) {
        console.error("Error fetching room details or messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!roomDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-lg">Room not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen w-full max-w-7xl mx-auto text-white">
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 mb-6 shadow-md">
        <h1 className="text-2xl font-bold mb-2">{roomDetails.roomName}</h1>
        <p className="text-sm text-gray-400 mb-4">
          Created on:{" "}
          {roomDetails.creationDate
            ? new Date(roomDetails.creationDate).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Unknown"}
        </p>
        <p className="text-gray-300">
          {roomDetails.roomDescription || "No description provided."}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {messages.length > 0 ? (
          messages.map((msg, index) => <Message key={index} message={msg} />)
        ) : (
          <div className="text-gray-400 col-span-full text-center">
            No messages yet. Share the room link to receive messages.
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
