'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function app() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} 
        <br />
        <button className="m-8 px-5 py-2 bg-slate-600 font-bold rounded-xl cursor-pointer hover:bg-slate-500 transition-colors duration-150 ease-in-out" onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in 
      <br />
      <button className="m-8 px-5 py-2 bg-slate-600 font-bold rounded-xl cursor-pointer hover:bg-slate-500 transition-colors duration-150 ease-in-out" onClick={() => signIn()}>Sign in</button>
    </>
  )
}