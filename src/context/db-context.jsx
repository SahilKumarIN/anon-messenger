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

  const checkShortUrl = async (shortUrl) => {
    setLoading(true);
    try {
      // Assuming you have a method to fetch documents by a query
      const links = await databases.listDocuments("short-links", "short-link", [
        Query.equal("shortUrl", shortUrl),
      ]);

      // Assuming the links collection has an array of documents
      if (links.documents.length > 0) {
        return false;
      }
      return true;
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (id) => {
    setDeleting(true);
    try {
      const delLink = await databases.deleteDocument(
        "short-links",
        "short-link",
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
        checkShortUrl,
        deleting,
        deleteLink,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
