import React from "react";
import { useAuth } from "../context/user-auth-context";

const UserProfile = () => {
  const { user } = useAuth();
  return <div>{`Hello ${user.name}`}</div>;
};

export default UserProfile;
