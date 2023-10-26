"use client";

import {  useSession } from "next-auth/react";

const UserPage = () => {
  const { data: session } = useSession();

  // console.log(session,status);

  return (
    <div className="user_page_main flex flex-col  items-center justify-center w-full h-full">
      <div>{session?.user?.id}</div>
      <div>{session?.user?.name}</div>
    </div>
  );
};

export default UserPage;
