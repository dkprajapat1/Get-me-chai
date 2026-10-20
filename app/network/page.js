'use client'
import React, { useState } from 'react'
import { fetchuserall } from "../actions/useraction";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import Link from 'next/link'

const page = () => {
    const router = useRouter()
    const [loading, setloading] = useState(true);
    const [users, setuser] = useState([{
        name: "",
        username: "",
        profilepic: "",
        coverpic: "",
        _id: ""
    }]);
    const [filtered_user, setfiltered_user] = useState([{
        name: "",
        username: "",
        profilepic: "",
        coverpic: "",
        _id: ""
    }]);


    const [search, setsearch] = useState("");

    const getall_user = async () => {
        const u = await fetchuserall()
        setuser(u);
        // console.log("all user data is :", u)
    }
    useEffect(() => {
        getall_user();
        setTimeout(() => {
            setloading(false);
        }, 200);
    }, [])

    useEffect(() => {
        setfiltered_user(users);

        if (search.length > 1) {
            const filtered = users.filter(
                user => user.name?.toLowerCase().startsWith(search)
            );
            setfiltered_user(filtered);
        }

    }, [search, users])


    const open_profile = (e) => {
        const get_user = users.find((data) => data._id == e)
        router.push(get_user?.username)
    }

    const handel = (e) => {
        setsearch(e.target.value);
    }

    if (loading) {
        return <Loading />;
    }
    else
        return (
            <>

                <div className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/60 text-white backdrop-blur-xl">

                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">

                        {/* Logo */}
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-extrabold tracking-tight sm:text-2xl">
                                Find your fav ❤️
                            </div>

                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-5 text-sm font-medium text-white/80 sm:text-base">
                            <Link
                                href="/"
                                className="transition-colors hover:text-white"
                            >
                                Home
                            </Link>

                            <Link
                                href="/profile"
                                className="transition-colors hover:text-white"
                            >
                                Profile
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="w-full md:w-64">
                            <input
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/10"
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={handel}
                            />
                        </div>

                    </div>
                </div>




                <div className="mt-35 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] min-h-[100vh]">
                    {
                        filtered_user.map((user) => {
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

                                        <button onClick={() => open_profile(user._id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer">
                                            Visit
                                        </button>

                                    </div>

                                </div>

                            </div>
                        })
                    }
                </div>


            </>
        )
}

export default page
