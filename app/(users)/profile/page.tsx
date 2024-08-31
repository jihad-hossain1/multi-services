import React from "react";
import { LinkList } from "./_comp/Linklist";
import { serverAuth } from "@/lib/server_session";

const Profile = async () => {
  return (
    <div className="w-11/12 mx-auto">
      <LinkList />
    </div>
  );
};

export default Profile;
