"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// ID , PW , 닉네임 , 이메일
const SignUpMain = () => {
  const [info, setInfo] = useState({
    AccountName: "",
    Password: "",
    PasswordAgain: "",
    Name: "",
    IsAdult: "",
  });
  const router = useRouter();
  //  10/12 비밀번호가 다를떄 회원가입을 하면 빨간색 보더가 생기고 알림창 ? 만들기
  const handleOnChagne: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.type === "checkbox") {
      setInfo({ ...info, [e.target.id]: e.target.checked });
    } else {
      setInfo({
        ...info,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (info.Password !== info.PasswordAgain) {
      console.error("비밀번호가 다릅니다");
      return;
    }
    const response = await fetch(`/api/signup`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "applcation/json",
      },
    });
    const data = await response.json();
    if(data.success){
      router.push('/')
    }
  };
  return (
    <div className="SignUp_wrap relative flex justify-center w-full h-full p-28">
      <div className="SignUp h-full w-1/2">
        <form
          onSubmit={handleSubmit}
          className="Signup_form flex flex-col  p-10 gap-y-5 bg-slate-100 rounded-lg "
        >
          <input
            type="text"
            id="AccountName"
            onChange={handleOnChagne}
            placeholder="Account Name"
            value={info.AccountName}
            autoFocus
          />
          <input
            type="password"
            id="Password"
            onChange={handleOnChagne}
            placeholder="Password ('8'characters or more)"
            value={info.Password}
            minLength={8}
            required
          />
          <input
            type="password"
            id="PasswordAgain"
            onChange={handleOnChagne}
            placeholder="Same as the Password above"
            value={info.PasswordAgain}
            minLength={8}
            required
          />
          <input
            type="text"
            id="Name"
            onChange={handleOnChagne}
            placeholder="Username or Nickname"
            value={info.Name}
          />
            <div>
            <label>성인입니까 ?</label>
          <input
            type="checkbox"
            id="IsAdult"
            onChange={handleOnChagne}
            className="border-2"
            />
            </div>
          <button> 회원가입 </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpMain;
