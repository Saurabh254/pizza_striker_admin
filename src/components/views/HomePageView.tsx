import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PizzaLogo from '../../assets/favicon.jpg'
import Request from "../../utils/requests_client";



const Header = () => {
    return <div className="h-[70px] items-center gap-8 p-4 w-full flex shadow-lg bg-white text-black rounded-xl">
        <img src={PizzaLogo} alt="logo" className="h-full" />
        <span className="font-bold">Pizza Striker - Admin Dashboard</span>
        <div className="flex gap-8 ml-auto items-center">
            <div ><Link to='/'>Home</Link></div>
            <div><Link to='/leaderboard'>Leaderboard</Link></div>
            <div><Link to='/auth/login' className="ring-offset-2 ring rounded-xl py-2 px-4 bg-indigo-600 text-white">Logout</Link></div>
        </div>
    </div>
}

const UserCard = ({ id, name, reason, created_at, strikes_count }) => {
    return <tr key={id} className="text-center">
        <td>
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                        <img
                            src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                            alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
                <div>
                    <div className="font-bold">{name}</div>
                </div>
            </div>
        </td>
        <td>
            {reason}

        </td>
        <td>{created_at}</td>
        <td>{strikes_count}</td>
        <th>
            <button className="btn btn-ghost text-red-600">Remove</button>
        </th>
    </tr>
}


const RecentStrikes = () => {
    const [recentStrikes, setRecentStrikes] = useState(null);
    useEffect(() => {
        const recentStrikesReq = async () => {
            const response = await Request.get('/admin/recent_strikes', '', true)
            setRecentStrikes(response)
        }
        recentStrikesReq()
    }, [])
    if (!recentStrikes) {
        return <div className="w-full flex items-center justify-center ">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    return <div className="overflow-x-auto border-2 rounded-xl">
        <table className="table text-center">
            {/* head */}
            <thead className="">
                <tr>

                    <th>Name</th>
                    <th>Reason</th>
                    <th>Created At</th>
                    <th>strikes Count</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="">
                {recentStrikes.items.map((e) => {
                    return <UserCard name={e.user.name} created_at={e.created_at} reason={e.reason} id={e.id} strikes_count={e.user.strike_count} key={e.id} />
                })}
            </tbody>
            {/* foot */}
        </table>
    </div>
}


const Main = () => {
    return <div className="">
        <div className="w-full items-center justify-center flex "><span className="text-xl  w-full text-center py-4">Recent Strikes</span></div>

        <RecentStrikes />
    </div>

}

const HomePageView = () => {
    return <React.Fragment>
        <Header />
        <Main />
    </React.Fragment>
}


export default HomePageView;