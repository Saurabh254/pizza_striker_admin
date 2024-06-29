import { useEffect, useState } from "react"
import Header from "../common/Header"
import RequestClient from "../../utils/requests_client"


const UserCard = ({ id, name, created_at, strikes_count }) => {
    created_at = new Date(created_at).toDateString()
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
        <td>{strikes_count}</td>
        <td>
            {created_at}

        </td>

    </tr >
}
const LeaderboardView = () => {
    const [usersList, setUserList] = useState(null);
    useEffect(() => {
        const userListReq = async () => {
            const response = await RequestClient.get('/admin/users', '', true)
            setUserList(response)
        }
        userListReq()
    }, [])
    if (!usersList) {
        return <div className="w-full flex items-center justify-center ">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    return <><div className="overflow-x-auto border-4 rounded-xl m-6 ">

        {
            usersList?.items?.length ? <>
                <table className="table text-center w-full ">
                    <thead className="border-b-4">
                        <tr>

                            <th>Name</th>
                            <th>strikes Count</th>
                            <th>Created At</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody className="">
                        {usersList?.items.map((e) => {
                            return <UserCard name={e.name} created_at={e.created_at} id={e.id} key={e.id} strikes_count={e.strike_count} />
                        })}
                    </tbody>
                </table>
            </>
                : <div className="text-center p-6">No Users</div>}
    </div>
        {usersList?.items?.length > 6 ? <div className=" mt-4 flex items-center justify-center w-full">
            <div className="gap-4 flex ">

                <button className="hover:bg-gray-200 py-2 px-4 rounded-xl shadow-sm border-2 border-gray-200">Previous</button>
                <button className="hover:bg-gray-200 py-2 px-4 rounded-xl shadow-sm border-2 border-gray-200">Next</button>

            </div>
        </div> : null}</>
}


export default LeaderboardView;