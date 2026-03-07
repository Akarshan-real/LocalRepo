"use client"

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<any>();
  const [errorMsg, setErrorMsg] = useState("");

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });

      if (response.data.success) {
        setVerified(true);
      }
    } catch (error: any) {
      setError(true);
      setErrorMsg(error.response?.data || "Some error");
      console.log(errorMsg);
    }
  };

  useEffect(() => {
    // const urlToken = window.location.search.split("=")[1];

    const urlToken = searchParams.get("token");

    if (urlToken && typeof (urlToken) === "string") {
      setToken(urlToken);
    }
    else {
      setToken("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl text-center">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 rounded-lg text-2xl font-bold my-4 text-black">
        {token ? `${token}` : "No token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-center">Verified</h2>
          <Link className="mt-3 bg-orange-500 rounded-lg px-2 py-1 font-bold" href={"/login"}>Go to login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-center">Error</h2>
          <p className="mt-3 bg-orange-500 rounded-lg px-2 py-1 font-bold">{errorMsg}</p>
        </div>
      )}
    </div>
  )
}

export default page
