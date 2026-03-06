"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success ", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    };
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    };
  }, [user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className='flex flex-col justify-center bg-slate-950 w-2xl p-8 rounded-2xl outline outline-white'>
        <h1 className='mt-3 mb-5 text-7xl text-center'>
          {loading ? "Processing" : "Signup"}
        </h1>
        <label className='text-xl mt-4 mb-2' htmlFor="username">Username</label>
        <input
          className='p-2 outline-2 bg-transparent transition outline-gray-400 focus:outline-white focus:bg-slate-900 rounded-lg'
          id='username'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='Enter username'
          type="text"
        />
        <label className='text-xl mt-4 mb-2' htmlFor="email">Email</label>
        <input
          className='p-2 outline-2 bg-transparent transition outline-gray-400 focus:outline-white focus:bg-slate-900 rounded-lg'
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label className='text-xl mt-4 mb-2' htmlFor="password">Password</label>
        <input
          className='p-2 outline-2 bg-transparent transition outline-gray-400 focus:outline-white focus:bg-slate-900 rounded-lg'
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onSignUp}
          className={`p-3 border border-gray-300 rounded-xl my-5 bg-slate-900 transition focus:outline-none focus:border-gray-600 ${buttonDisabled || loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-950"}`}
          disabled={buttonDisabled || loading}
        >
          {buttonDisabled || loading ?
            "No signup"
            :
            "Signup"
          }
        </button>
        <Link href="/login" className='px-4 text-center bg-slate-900 hover:bg-slate-950 transition py-3 outline outline-white rounded-xl'>Visit login page</Link>
        < Toaster />
      </div>
    </div >
  )
}

export default page
