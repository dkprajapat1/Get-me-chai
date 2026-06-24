'use client'
import React, { useState } from 'react'
import { fetchuserall } from "../actions/useraction";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
    const router = useRouter()
    const [users , setuser] = useState([{
         name: "",
         username:"",
        profilepic: "",
        coverpic: "",
        _id:""
    }]);
    const getall_user = async () => {
        const u = await fetchuserall()
        setuser(u);
        // console.log("all user data is :", u)
    }
    useEffect(() => {
        getall_user();
    }, [])

    const  open_profile = (e)=>{
        const get_user = users.find((data) => data._id == e)
        router.push(get_user?.username)
    }

    return (
        <div className="mt-25 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] min-h-[100vh]">
            {
                users.map((user) => {
                    return <div key={user._id} className="my-2 bg-slate-900 border border-slate-800 rounded-3xl shadow-lg w-[95%] md:w-[85%] lg:w-[80%] mx-auto overflow-hidden">

                        {/* Banner */}
                        <div className="h-20 md:h-24">
                            <img
                                src={user.coverpic || "/banner.png"}
                                alt="cover"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="relative px-4 py-3">

                            {/* Profile */}
                            <div className="absolute -top-8 md:-top-8">
                                <img
                                    src={user.profilepic || "/banner.png"}
                                    alt="profile"
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-slate-900 object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="ml-20 md:ml-24 flex items-center justify-between">

                                <div className=''>
                                    <h2 className="text-white font-bold text-lg">
                                        {user.name}
                                    </h2>

                                    <div className="text-blue-400 text-sm">
                                        {user.username}
                                    </div>
                                </div>

                                <button onClick={()=>open_profile(user._id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                                    Visit
                                </button>

                            </div>

                        </div>

                    </div>
                })
            }
        </div>

    )
}

export default page
