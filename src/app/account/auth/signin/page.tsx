// 로그인 페이지
'use client'
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

// ID , PW , 회원가입 , ID찾기 , PW찾기
const SignInMain = () => {
  const [signinData,setSigninData] = useState({
    AccountName : "",
    Password : ""
  })
  const {data : session} = useSession();
  console.log('session',session);
  
  const handleOnChagne :React.ChangeEventHandler<HTMLInputElement> = (e)=>{
    setSigninData({...signinData,[e.target.id]: e.target.value})
  }

  const handleSubmit = async(e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = signIn("credentials",{
      AccountName: signinData.AccountName,
      Password: signinData.Password
    })
    
    const result = await response
    console.log('signin Page result',result);
    // 10/17 로그인 실패했을때 코드에 따라 창 띄워주기 (계정틀림,PW틀림) 

  };
  return (
    <div  className="Signin_wrap relative flex justify-center w-full h-full p-28">
      <div className="Signin h-full w-1/2 bg-slate-100 rounded-lg">
        <form onSubmit={handleSubmit} className="Signin_form flex flex-col items-center p-10 gap-y-5  ">   
          <input
            type="text"
            id="AccountName"
            onChange={handleOnChagne}
            className="w-full h-10 border-b-2"
            placeholder="Account Name"
            value={signinData.AccountName}
            autoFocus
          />
          <input
            type="password"
            id="Password"
            onChange={handleOnChagne}
            className="w-full h-10 border-b-2"
            placeholder="Password ('8'characters or more)"
            value={signinData.Password}
            minLength={8}
            required
          />
          <button   className="text-lg w-3/4 bg-slate-400 mt-3 py-4 rounded-lg"> 로그인 </button>
        </form>
        <div className="LinkWrap flex justify-evenly my-7 text-sm opacity-60 ">
          <div>
            <Link href="/signup" className="Link_signin">
              회원가입
            </Link>
          </div>
          <ul className="flex">
            <li>
              <Link href="/" className="Link_findaccount">
                계정 찾기
              </Link>
            </li>
            <li className=" before:content-[''] before:float-left before:w-[1px] before:h-3 before:bg-black/70 before:mx-2 before:my-[5px]  ">
              <Link href="/" className="Link_findpasswrod">
                비밀번호 찾기
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignInMain;
