"use client";

import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchpayments, initiate } from "../actions/useraction";


const Userpage = ({ params }) => {
    const { data: session } = useSession();
    const [paymentform, setPaymentform] = React.useState({ name: "", message: "", amount: "" })
    const [done_payments, setDone_payments] = useState()
    console.log(params)
    const pay = async (amount) => {
        // Get the order Id 
        let a = await initiate(amount, params.username, paymentform)

        let orderId = a.id
        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    const handlechange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getdata()
    }, [params?.username])

    const getdata = async () => {
        let u = await fetchpayments(params.username)
        setDone_payments(u)
    }


    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="text-white [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] -mb-6">
                <div>
                    {/* banner */}
                    <img
                        className="w-full h-70 object-cover object-center"
                        src={params.coverpic || "/banner.png"}
                        alt="banner"
                    />

                    <div className="flex flex-col items-center -mt-10">
                        <img
                            className="h-[150px] w-[150px] rounded-full border-4 border-white"
                            src={params.profilepic || session?.user?.image}
                            alt="profile"
                        />

                        <div className="mt-4 text-5xl md:text-7xl font-bold text-center font-serif">
                            Hello{" "}
                            <span className="text-blue-400">
                                {params.name || params.username}
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
                    <div className="flex flex-col gap-3 w-[50%]">
                        <input onChange={handlechange} name="name" value={paymentform.name} className="bg-white/70 text-black px-3 py-2 rounded" type="text" placeholder="Name" />
                        <input onChange={handlechange} name="message" value={paymentform.message} className="bg-white/70 text-black px-3 py-2 rounded" type="text" placeholder="Message" />
                        <input onChange={handlechange} name="amount" value={paymentform.amount} className="bg-white/70 text-black px-3 py-2 rounded" type="text" placeholder="Pay" />
                        <div className="flex gap-3">
                            <div onClick={() => pay(1000)} className="px-2 py-1 border rounded w-fit hover:bg-white/30 hover:cursor-pointer">Pay ₹10</div>
                            <div onClick={() => pay(2000)} className="px-2 py-1 border rounded w-fit hover:bg-white/30 hover:cursor-pointer">Pay ₹20</div>
                            <div onClick={() => pay(5000)} className="px-2 py-1 border rounded w-fit hover:bg-white/30 hover:cursor-pointer">Pay ₹50</div>
                        </div>
                        <button onClick={() => pay(paymentform.amount * 100)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded" disabled={paymentform.name.length < 3 || paymentform.message.length < 3 || paymentform.amount <= 0}>Pay Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Userpage;