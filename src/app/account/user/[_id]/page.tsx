'use client'

import { getSession, useSession } from "next-auth/react";

const UserPage = () => {
  
  async function getSession() {
    const session = await getSession();
    console.log('getSession session',session);

  }
  const session = useSession();
  console.log('useSession session', session);
  
  
  
  return (
  <div>
    
  </div>
  )
};

export default UserPage;
