import React, { useEffect, useState } from "react";
import { ClipboardListIcon, PencilLine } from "lucide-react";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDb } from "../context/db-context";
import { useAuth } from "../context/user-auth-context";
import RoomComp from "../components/RoomComp";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [allRooms, setAllRooms] = useState([]);
  const { validateRoom, createRoom, getAllRooms } = useDb();
  const { user } = useAuth();

  const generateRoomId = async () => {
    let symbols =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 8; i++) {
      id += symbols.charAt(Math.floor(Math.random() * 62));
    }

    const isValid = await validateRoom(id);
    if (isValid) {
      setRoomId(id);
      await createRoom(roomName.trim(), id, user.$id);
    } else {
      generateRoomId(); // Try again
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchRooms = async () => {
      try {
        const rooms = await getAllRooms(user.$id);
        setAllRooms(rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [user, getAllRooms]);

  return (
    <>
      <h2 className="text-center text-white text-xl sm:text-2xl font-semibold mt-4">
        Your Rooms
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {allRooms.length > 0 ? (
          allRooms.map((room) => <RoomComp key={room.$id} data={room} />)
        ) : (
          <p className="text-white col-span-full text-center">No rooms yet.</p>
        )}
      </div>

      <div
        className="fixed bottom-6 right-4 z-30 flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full cursor-pointer shadow-lg transition-transform transform hover:scale-105"
        onClick={() => setModal(true)}
      >
        <PencilLine size={18} />
        <span className="text-sm font-medium">Create Room</span>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Create a Room
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="room-name"
                id="room-name"
                placeholder="Enter Room Name"
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />

              {roomId && (
                <>
                  <div className="flex items-center gap-2 mt-3">
                    <label className="bg-gray-700 text-white px-4 py-2 rounded-md w-1/3 text-center">
                      Room ID
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={roomId}
                      className="w-2/3 border border-gray-300 rounded-md p-2 bg-gray-100"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
                    <Link
                      to="#"
                      className="text-blue-600 text-sm underline break-all"
                    >
                      {`https://anon-msngr.live/new-message/${roomId}`}
                    </Link>
                    <button
                      className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://anon-msngr.live/new-message/${roomId}`
                        );
                        toast.success("Link copied to clipboard!");
                      }}
                    >
                      <ClipboardListIcon size={14} />
                      Copy
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 mt-6">
              <button
                className={`w-2/3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition ${
                  roomId || !roomName.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!!roomId || !roomName.trim()}
                onClick={generateRoomId}
              >
                Create Room
              </button>
              <button
                className="w-1/3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setModal(false);
                  setRoomId(null);
                  setRoomName("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
