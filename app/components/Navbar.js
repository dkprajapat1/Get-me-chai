'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
    const { data: session } = useSession()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <div className="flex bg-[oklch(10.7%_0.09_281.288)]/95 justify-between px-4 sm:px-5 py-3 text-white items-center w-full fixed z-20 top-0 left-0">
                {/* Logo */}
                <div className='flex items-center gap-2'>
                    <img src="/coffee-lover.gif" alt="Chai" className='w-8' />
                    <div className='font-bold text-2xl sm:text-3xl'>Chai</div>
                </div>

                {/* Desktop links */}
                <div className='hidden md:flex gap-3 items-center'>
                    <Link href={"/"}>
                        <div className='cursor-pointer hover:bg-white/10 px-2 py-1 rounded-2xl whitespace-nowrap'>Home</div>
                    </Link>
                    <Link href={"/login"}>
                        <div className='cursor-pointer hover:bg-white/10 px-2 py-1 rounded-2xl whitespace-nowrap'>Profile</div>
                    </Link>
                    <Link href={"/network"}>
                        <div className='cursor-pointer hover:bg-white/10 px-2 py-1 rounded-2xl whitespace-nowrap'>Find User</div>
                    </Link>
                </div>

                {/* Desktop auth section */}
                <div className='hidden md:flex'>
                    {
                        session ?
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-2'>
                                    <Link href={"/profile"}>
                                        <img src={session?.user?.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                                    </Link>
                                    <div className="whitespace-nowrap">{session.user.name}</div>
                                </div>
                                <button
                                    className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white hover:rounded-2xl dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded cursor-pointer duration-200 ease-in"
                                    onClick={() => signOut()}
                                >
                                    <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent leading-5">
                                        SignOut
                                    </span>
                                </button>
                            </div>
                            :
                            <Link href={"/login"}>
                                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white hover:rounded-2xl dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded cursor-pointer duration-200 ease-in">
                                    <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent leading-5">
                                        Login
                                    </span>
                                </button>
                            </Link>
                    }
                </div>

                {/* Mobile hamburger button */}
                <button
                    className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/10"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="md:hidden fixed top-[56px] left-0 w-full bg-[oklch(10.7%_0.09_281.288)] text-white z-10 flex flex-col px-4 py-3 gap-2 shadow-lg">
                    <Link href={"/"} onClick={() => setMenuOpen(false)}>
                        <div className='cursor-pointer hover:bg-white/10 px-2 py-2 rounded-xl'>Home</div>
                    </Link>
                    <Link href={"/login"} onClick={() => setMenuOpen(false)}>
                        <div className='cursor-pointer hover:bg-white/10 px-2 py-2 rounded-xl'>Profile</div>
                    </Link>
                    <Link href={"/network"} onClick={() => setMenuOpen(false)}>
                        <div className='cursor-pointer hover:bg-white/10 px-2 py-2 rounded-xl'>Find User</div>
                    </Link>

                    <div className="border-t border-white/10 my-2" />

                    {
                        session ?
                            <div className='flex items-center justify-between'>
                                <Link href={"/profile"} onClick={() => setMenuOpen(false)}>
                                    <div className='flex items-center gap-2'>
                                        <img src={session.user.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                                        <span>{session.user.name}</span>
                                    </div>
                                </Link>
                                <button
                                    className="px-3 py-1 text-sm font-medium rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500"
                                    onClick={() => { signOut(); setMenuOpen(false) }}
                                >
                                    SignOut
                                </button>
                            </div>
                            :
                            <Link href={"/login"} onClick={() => setMenuOpen(false)}>
                                <button className="w-full px-3 py-2 text-sm font-medium rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500">
                                    Login
                                </button>
                            </Link>
                    }
                </div>
            )}
        </>
    )
}

export default Navbar