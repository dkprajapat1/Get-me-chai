'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Main = () => {
    const { data: session } = useSession()
    return (
        <div className="text-white text-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            <div className='min-h-[99vh] flex flex-col justify-center gap-3 px-4'>
                <div className='text-3xl sm:text-4xl md:text-5xl font-bold'>GET ME A <span className='text-yellow-400 font-serif'>CHAI</span></div>
                <div className=''>
                    <p className='max-w-xl mx-auto text-sm sm:text-base'>A creator support platform where fans can discover creators, leave messages, and contribute directly through secure payments.</p>
                </div>
                <div className='flex flex-wrap justify-center gap-4 sm:gap-5'>
                    {
                        session ?
                            <button className="text-white" onClick={() => signOut()}>Sign out</button> :
                            <Link href={"/login"}>
                                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white hover:rounded-2xl dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded cursor-pointer duration-200 ease-in">
                                    <span className=" relative px-3 py-1 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
                                        Login
                                    </span>
                                </button>
                            </Link>
                    }
                    <Link href={"/help"}>
                        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white hover:rounded-2xl dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded cursor-pointer duration-200 ease-in">
                            <span className=" relative px-3 py-1 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
                                More
                            </span>
                        </button>
                    </Link>

                </div>
                <div>
                    <img className='absolute bottom-10 sm:bottom-15 border rounded-2xl py-3 left-1/2 -translate-x-1/2' width={40} height={30} src="/down-arrow.gif" alt="down" />
                </div>
            </div>

            <div className='h-0.5 w-[90%] bg-white/30 m-auto my-3'></div>
            <div className='flex flex-col md:flex-row items-center m-auto justify-around gap-8 md:gap-4 w-[92%] md:w-[70vw] py-8'>
                <div className='bg-white/50'>
                    <img className='rounded rotate-5 hover:sepia-50 p-1 w-[200px] sm:w-[240px] md:w-[200px] h-auto' width={200} height={150} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSC5AJsWx5euVlk7c2ANrWXbJ1JZLX-ff-bWGKocNr5fswGcnJCDHk9PY&s=10" alt="img" />
                </div>
                <div className='w-full md:w-[40%] flex flex-col gap-6 md:gap-[25%]'>
                    <h1 className='text-2xl sm:text-3xl font-extrabold'>About</h1>
                    <p className='text-sm sm:text-base'>Hi! I'm the creator of Get Me A Chai, a platform built to help creators receive support directly from their audience. Whether you're a developer, designer, writer, or content creator, this platform makes it easy for supporters to contribute, leave encouraging messages, and help fuel your next project. Every cup of chai is a small gesture of appreciation that keeps creativity going.</p>
                </div>
            </div>
        </div>
    )
}

export default Main