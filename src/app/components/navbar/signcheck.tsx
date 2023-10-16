import Link from "next/link";

const NavbarSign = () => {
  return (
    <ul className="flex flex-row mx-6 ">
      <li className="signin mx-2 border-2">
        <Link href="/account/signin">로그인</Link>
      </li>
      <li className="signup mx-2 border-2">
        <Link href="/account/signup">회원가입</Link>
      </li>
    </ul>
  );
};

export default NavbarSign;
