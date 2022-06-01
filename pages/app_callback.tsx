import { NextPage } from "next";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

interface User {
    username: string;
    repo: string;
}

const AppCallback: NextPage = () => {

    const {user, Login, Logout} = useAuth(() => { Login() })
    const [repo, setRepo] = useState<User | null>(null)

    useEffect(() => {
        if (user) {
            fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}update_blog?accessToken=${localStorage.accessToken}&username=${user.username}&repo=${repo?.repo}`
            )
            fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}user_repo?username=${user.username}`
            ).then(
                async (resp) => {
                    const json = await resp.json();
                    setRepo(json.data)
                }
            )
        }
    },[user])
    
    return (
        <>
            {repo && (
                <>
                    <h1>The blog should be up in few mins. check for it here - <a className="text-blue-400" href={`${process.env.NEXT_PUBLIC_BACKEND_URL}u/${repo.username}/`}>{`${process.env.NEXT_PUBLIC_BACKEND_URL}u/${repo.username}/`}</a> </h1>
                </>
            )}
        </>
    )
}

export default AppCallback;