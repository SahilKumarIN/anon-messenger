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
  const [roomName, setRoomName] = useState(null);
  const [allRooms, setAllRooms] = useState([]);
  const { validateRoom, createRoom, getAllRooms } = useDb();
  const { user } = useAuth();

  function generateRoomId() {
    let symbols =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let rndId = "";
    for (let i = 0; i < 8; i++) {
      rndId += symbols.charAt(Math.floor(Math.random() * 62));
    }
    if (validateRoom(rndId)) {
      // console.log(rndId);
      setRoomId(rndId);
      createRoom(roomName, rndId, user.$id);
      return;
    } else {
      generateRoomId();
    }
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchRooms = async () => {
      try {
        const rooms = await getAllRooms(user.$id);
        setAllRooms(rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [getAllRooms]);

  return (
    <>
      {/* <h2 className="text-center text-white font-bold text-lg">
        Messages you Received!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 ">
        {new Array(4).fill(null).map((_, index) => (
          <Message key={index} />
        ))}
      </div> */}
      <h2 className="text-center text-white font-bold text-lg">Your Rooms!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 ">
        {allRooms.length > 0 ? (
          allRooms.map((room) => <RoomComp key={room.$id} data={room} />)
        ) : (
          <p className="text-white text-center">No rooms available.</p>
        )}
      </div>

      <div
        className="fixed bottom-8 z-30 right-4 flex items-center gap-1 text-white bg-gray-700 p-2 rounded-full cursor-pointer shadow-md transition transform hover:scale-105"
        onClick={() => {
          setModal(true);
        }}
      >
        <PencilLine size={16} color="white" />
        <span className="text-xs">Create a Room</span>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-6 rounded-md shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create a Room</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="room-name"
                id="room-name"
                placeholder="Room Name (Alphanumeric)"
                className="border border-gray-600 rounded p-2"
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              />
              {roomId && (
                <>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-gray-800 w-1/3 text-white px-4 py-2 rounded">
                      Room ID
                    </div>
                    <input
                      type="text"
                      name="room-id"
                      id="room-id"
                      placeholder="Room ID"
                      className="border w-2/3 border-gray-500 rounded p-2"
                      value={roomId}
                      readOnly
                    />
                  </div>

                  <div className="flex items-center justify-between cursor-pointer mt-4">
                    <Link to="#" className="text-blue-600 underline">
                      {`https://anon-msngr.live/new-message/${roomId}`}
                    </Link>
                    <div
                      className="flex items-center gap-1 bg-gray-600 p-2 rounded"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://anon-msngr.live/new-message/${roomId}`
                        );
                        toast.success("Copied");
                      }}
                    >
                      <ClipboardListIcon size={14} color="white" />
                      <span className="text-white text-sm">Copy</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 mt-6">
              <button
                disabled={!!roomId}
                className={`w-2/3 bg-green-600 text-white px-4 py-2 rounded transition ${
                  roomId ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => generateRoomId()}
              >
                Create
              </button>
              <button
                className="w-1/3 bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  setModal(false);
                  setRoomId(null);
                  setRoomName(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
