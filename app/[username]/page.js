"use client"

import { use, useState } from "react";
import { useEffect } from "react";
import Userpage from "../components/Userpage";
import { fetchuser } from "../actions/useraction";

export default function Page({ params }) {
    const { username } = use(params);
    const [userdata , setuser_data] = useState("")
    useEffect(() => {
        if (username) {
            getdata();
        }
    }, [username])

    const getdata = async () => {
        let d = await fetchuser(username)
        // console.log("fetched user at username page:", d);
        setuser_data(d);
    }
    return <div>
        <Userpage params={userdata} />
        {username}
    </div>;
}