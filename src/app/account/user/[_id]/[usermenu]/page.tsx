"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserMenuPage = () => {
  const [menuName, setMenuName] = useState("");
  const { usermenu } = useParams() as { usermenu: string };

  useEffect(() => {
    setMenuName(usermenu);
  }, [usermenu]);

  return <>{dispMenuPage(menuName)}</>;
};

export default UserMenuPage;

function dispMenuPage(menuname: string) {
  if (menuname === "mypage") {
    return <div>{menuname}</div>;
  } else if (menuname === "editinfo") {
    return <div>{menuname}</div>;
  } else if (menuname === "likelist") {
    return <div>{menuname}</div>;
  } else if (menuname === "boardlist") {
    return <div>{menuname}</div>;
  }
}
