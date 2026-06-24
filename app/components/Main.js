'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Main = () => {
    const { data: session } = useSession()
    return (
        <div className="text-white text-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            <div className='h-[99vh] flex flex-col justify-center gap-3 flex'>
                <div className='text-5xl font-bold'>GET ME A <span className='text-yellow-400 font-serif'>CHAI</span></div>
                <div className=''>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, quo. Libero perferendis distinctio eveniet error.</p>
                </div>
                <div className='flex justify-center gap-5'>
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
                    <img className='absolute bottom-15 border rounded-2xl py-3 right-[49%] ' width={40} height={30} src="/down-arrow.gif" alt="down" />
                </div>
            </div>

            <div className='h-0.5 w-[90%] bg-white/30 m-auto my-3'></div>
            <div className='flex m-auto justify-around w-[70vw] py-8'>
                <div className='bg-white/50'>
                    <img className='rounded rotate-5 hover:sepia-50 p-1' width={200} height={150} src="https://media.newyorker.com/photos/59095bb86552fa0be682d9d0/master/w_1920,c_limit/Monkey-Selfie.jpg" alt="img" />
                </div>
                <div className='w-[40%] flex flex-col gap-[25%]'>
                    <h1 className='text-3xl font-extrabold'>About</h1>
                    <p>Hi! I'm Monkey, a playful and curious jungle explorer. I love swinging through trees, eating bananas, and going on exciting adventures with my friends. I'm always ready to learn new things and have fun. Welcome to my world—let's explore, play, and discover amazing things together!</p>
                </div>
            </div>
        </div>
    )
}

export default Main
