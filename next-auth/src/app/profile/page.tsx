"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
    const router = useRouter();
    const [data, setData] = useState<string | null>(null);

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/me");
            console.log(response);
            setData(response.data.data._id);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/users/logout");
            toast.success("Logout success");
            setTimeout(() => {
                router.push("/login")
            }, 200);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="px-4 py-2 rounded bg-green-500">
                {data === null ?
                    "Nothing"
                    :
                    <Link href={`/profile/${data}`}>
                        {data}
                    </Link>
                }
            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                GetUser Details
            </button>
            <Toaster />
        </div>
    );
};

export default page;
