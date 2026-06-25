'use client'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import Userpage from '../components/Userpage'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'
import { fetchpayments, fetchuser, updateProfile } from "../actions/useraction";

const page = () => {
    const { data: session } = useSession()
    const router = useRouter();
    const [done_payments, setDone_payments] = useState()
    const [user_data, setuser_data] = useState({
        name: "",
        username: "",
        profilepic: "",
        coverpic: "",
        _id: ""
    })

    // user form info
    const [user_info, setuser_info] = useState({
        name: "",
        razorpayid: "",
        razorpaysecret: "",
        profilepic: "",
        coverpic: "",
        email: session?.user?.email

    });

    useEffect(() => {
        if (!session) {
            router.push("/login")
        }

    }, [session])

    useEffect(() => {
        if (session?.user?.name) {
            getdata();
        }
    }, [session?.user?.name])

    const getdata = async () => {
        let u = await fetchpayments(session?.user?.name)
        setDone_payments(u)

        let d = await fetchuser(session?.user?.name)
        // console.log("fetched user:", d);
        setuser_data(d)
        setuser_info(d)
    }

    const handlechange = (e) => {
        setuser_info({ ...user_info, [e.target.name]: e.target.value })
    }

    const update_data = async () => {
        try {
            let a = await updateProfile(user_info, session?.user?.name)
            notify()
        } catch (err) {
            console.error("CLIENT ERROR", err)
        }
    }

    const notify = () => toast("Profile Updated!");


    return (
        <div>
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />
                <div className="min-h-screen text-white [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#6633EE_100%)]">
                    <div>
                        <img
                            className="w-full h-70 object-cover object-center"
                            src={user_data?.coverpic || "/banner.png"}
                            alt="banner"
                        />
                        {/* profile */}
                        <div className="flex flex-col items-center -mt-10">
                            <img
                                className="h-[150px] w-[150px] rounded-full border-4 border-white"
                                src={user_data?.profilepic || session?.user?.image}
                                alt="profile"
                            />

                            <div className="mt-4 text-5xl md:text-7xl font-bold text-center font-serif">
                                Hello{" "}
                                <span className="text-blue-400">
                                    {user_data.name || session?.user?.name}
                                </span>
                            </div>
                        </div>
                    </div>


                    {/* message box for all done payment */}
                    <div className="flex flex-col md:flex-row w-[85%] justify-around  rounded-lg p-6 m-auto mt-20">
                        <div className="flex flex-col gap-1 mb-6 md:mb-0 border border-amber-100/30 rounded-2xl w-[40%] p-3 items-center">
                            <h2 className="text-2xl font-bold my-3">Messages</h2>
                            <ul className="space-y-3">
                                {
                                    done_payments && done_payments.map((user) => {
                                        return <li key={user._id} className="flex items-center gap-2">
                                            <img className="p-1 rounded-full border-2" width={25} src="fix_profile.gif" alt="profile" />
                                            <p>
                                                {user.name.toUpperCase()} give you
                                                <span className="font-bold"> ₹{user.amount}</span>
                                                <span className="text-green-500"> "{user.message}" </span>
                                            </p>
                                        </li>
                                    })
                                }

                            </ul>
                        </div>

                        {/* input and pay button box */}
                        <div className="flex gap-1 flex-col w-[50%] bg-white/30 px-5 rounded py-4">
                            <label htmlFor='name' className='relative text-black bg-white/30 rounded px-3'>Name</label>
                            <input onChange={handlechange} name="name" value={user_info.name} className="bg-white/70 text-black px-3 py-2 rounded" type="text" placeholder="Name" />
                            <label htmlFor='razorpayid' className='relative text-black bg-white/30 rounded px-3'>Razorpay Id</label>
                            <input onChange={handlechange} name="razorpayid" value={user_info.razorpayid} className="bg-white/70 text-black px-3 py-2 rounded" type="password" placeholder="Razorpay Id" />
                            <label htmlFor='razorpaysecret' className='relative text-black bg-white/30 rounded px-3'>Razorpay Secret</label>
                            <input onChange={handlechange} name="razorpaysecret" value={user_info.razorpaysecret} className="bg-white/70 text-black px-3 py-2 rounded" type="password" placeholder="Razorpay secret" />

                            <label htmlFor='profilepic' className='relative text-black bg-white/30 rounded px-3'>Profile Picture URL</label>
                            <input onChange={handlechange} name="profilepic" value={user_info.profilepic} className="bg-white/70 text-black px-3 py-2 rounded" type="text" placeholder="profilepic URL" />

                            <label htmlFor='coverpic' className='relative text-black bg-white/30 rounded px-3'>Cover Picture URL</label>
                            <input onChange={handlechange} name="coverpic" value={user_info.coverpic} className="bg-white/70 text-black px-3 py-2 rounded" type="text" placeholder="coverpic URL" />
                             <div className='relative text-black bg-white/30 rounded px-3'>Email</div>
                            <div className="bg-white/70 text-black px-3 py-2 rounded cursor-not-allowed">{user_info.email}</div>

                            <button onClick={() => update_data()} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded" >Save</button>
                        </div>
                    </div>


                </div>
            </>
        </div>
    )
}

export default page
