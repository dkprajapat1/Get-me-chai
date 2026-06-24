'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

// signOut
const Navbar = () => {
    const { data: session } = useSession()

    return (
        <>
            <div className="flex bg-[oklch(10.7%_0.09_281.288)]/95 justify-between px-5 py-3 text-white items-center w-full fixed z-10">
                <div className='flex items-center gap-2'>
                    <img src="/coffee-lover.gif" alt="Chai" className='w-8' />
                    <div className='mt-3 font-bold text-3xl '>Chai</div>
                </div>
                <div className='flex gap-3 justify-between'>
                    <Link href={"/"}> <div className='cursor-pointer hover:bg-white/10 px-2 py-1 rounded-2xl w-full'>Home</div></Link>
                    <Link href={"/login"}> <div className='cursor-pointer hover:bg-white/10 px-2 py-1 rounded-2xl w-full'>Profile</div></Link>
                    <Link href={"/network"}><div className='cursor-pointer hover:bg-white/10 px-2 py-1 rounded-2xl w-full'>Find User</div> </Link>
                </div>
                {
                    session ?
                        <div className='flex gap-3'>
                            <div className='flex items-center gap-2'>
                                <Link href={"/profile"}>
                                    <img src={session.user.image} alt="" className="w-8 rounded-full" />
                                </Link>
                                <div>{session.user.name} </div>
                            </div>
                            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white hover:rounded-2xl dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded cursor-pointer duration-200 ease-in" onClick={() => signOut()}>
                                <span className=" relative px-3 py-1 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
                                    SignOut
                                </span>
                            </button>
                        </div>
                        :
                        <Link href={"/login"}>
                            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white hover:rounded-2xl dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded cursor-pointer duration-200 ease-in">
                                <span className=" relative px-3 py-1 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
                                    Login
                                </span>
                            </button>
                        </Link>
                }
            </div>
        </>
    )
}

export default Navbar
