import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Dashboard: NextPage = () => {

    const router: NextRouter = useRouter();
    const { user, Login, Logout } = useAuth({ ifNoUser: () => {
        Login()
    }});

    useEffect(() => {
        if (user === null) return
        console.log(user)
        fetch(`http:///localhost:3000/user_repo?username=${user.username}&token=${localStorage.accessToken}`)
            .then(
                async (resp) => {
                    const json = await resp.json();

                    if (json.success === 0) {
                        
                    } 
                }
            )
        
    },[user])

    return (
        <div className="bg-black min-h-screen w-screen">

        </div>
    )
}

export default Dashboard;