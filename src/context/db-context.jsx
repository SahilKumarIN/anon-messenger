import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { databases } from "../db/appwrite.js";
import { ID, Query } from "appwrite";
// Create a context for database
const DbContext = createContext();

// Custom hook to use the DatabaseContext
export const useDb = () => {
  return useContext(DbContext);
};

export const DbProvider = ({ children }) => {
  const [database, setDataBase] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const createRoom = async (roomName, roomId, userId) => {
    try {
      const roomCreated = await databases.createDocument(
        "anon-messenger",
        "anon-rooms",
        ID.unique(),
        {
          roomName,
          roomId,
          userId,
        }
      );
      //console.log(linkCreated);
      toast.success("Anonymous Room generated.");
    } catch (error) {
      setError(error);
      toast.error(error?.message);
    }
  };

  const createMessage = async (msgTitle, msgBody, roomId, userId) => {
    try {
      const messageCreated = await databases.createDocument(
        "anon-messenger",
        "anon-messages",
        ID.unique(),
        {
          msgTitle,
          msgBody,
          userId,
          roomId,
        }
      );
      //console.log(linkCreated);
      toast.success("anon-message sent✅");
    } catch (error) {
      setError(error);
      toast.error(error?.message);
    }
  };

  const getRoom = async (roomId) => {
    setLoading(true);
    try {
      const rooms = await databases.listDocuments(
        "anon-messenger",
        "anon-rooms",
        [Query.equal("roomId", roomId)]
      );
      //console.log(links);
      return rooms.documents[0];
    } catch (error) {
      setError(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const validateRoom = async (roomId) => {
    setLoading(true);
    try {
      // Assuming you have a method to fetch documents by a query
      const rooms = await databases.listDocuments(
        "anon-messenger",
        "anon-rooms",
        [Query.equal("roomId", roomId)]
      );

      // Assuming the links collection has an array of documents
      console.log(rooms.documents.length);
      return rooms.documents.length > 0;
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoomMessages = async (roomId) => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        "anon-messenger", // Database ID
        "anon-messages", // Collection ID
        [Query.equal("roomId", roomId)]
      );
      return response.documents;
    } catch (error) {
      setError(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllRooms = async (userId) => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        "anon-messenger", // Database ID
        "anon-rooms", // Collection ID
        [Query.equal("userId", userId)]
      );
      return response.documents; // Assuming the response contains a 'documents' array
    } catch (error) {
      setError(error);
      toast.error(error?.message);
      return null; // Return an empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    setDeleting(true);
    try {
      const delRoom = await databases.deleteDocument(
        "anon-messenger",
        "anon-rooms",
        id
      );

      if (delLink.documents.length > 0) {
        return true;
      }
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DbContext.Provider
      value={{
        database,
        loading,
        createRoom,
        getRoom,
        validateRoom,
        createMessage,
        getAllRooms,
        getRoomMessages,
        deleting,
        deleteRoom,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
