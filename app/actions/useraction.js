"use server"

import Razorpay from "razorpay"
import Payment from "../models/payment"
import connectDb from "../db/connectDb"
import User from "../models/user"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()


    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({ username: to_username })
    console.log("check user data razorpaysecret =", user.razorpaysecret)

    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })


    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // 

    // create a payment object which shows a pending payment in the database
    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message })

    return x

}

export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    if (!u) {
        return null
    }
    let k = u.toObject({ flattenObjectIds: true })
    return k
}



// for the network page to fetch all users and display them in the network page, we need to create a function that fetches all users from the database. This function will be called from the network page to get the list of users and display them.
export const fetchuserall = async () => {
    await connectDb()
    let x = await User.find({ active_status: true }).lean()
    if (!x) {
        return null
    }

    x.map((id) => {
        id._id = id._id.toString()
    })
    return x
}

export const fetchpayments = async (username) => {
    await connectDb()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()

    p.map((payment) => {
        payment._id = payment._id.toString()
    })

    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    // console.log("data in update profile is :", data)
    let ndata = data
    let result = await User.updateOne(
        { email: ndata.email },
        ndata
    )
    console.log(result)
    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })

    }
    await User.updateOne({ email: ndata.email }, ndata)
}

export const updatestatus = async (username, status1) => {
    await connectDb()
    console.log("updatestatus called with username:", username, "and status:", status1)
    let u = await User.findOne({ username: username })
    if (!u) {
        return { error: "Username not found" }
    }
    const result = await User.updateOne({ username }, { $set: { active_status: status1 } })

    console.log(result);
}

