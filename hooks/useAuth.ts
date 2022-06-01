import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
    username : string;
    avatar : string;
}

const useAuth = (ifNoUser? : (() => void)) => {
    const [user, setUser] = useState<User | null>(null);
    const route = useRouter()

    const Login = () => {
        route.push('/auth/login')
    }

    const Logout = () => {
        setUser(null)
        localStorage.removeItem('accessToken')
        route.push('/')
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            fetch(
                `https://api.github.com/user`,
                {
                    headers: {
                        Authorization: `token ${accessToken}`
                    }
                }
            ).then(
                async (resp) => {
                    const json = await resp.json()
                    
                    setUser({
                        username: json.login,
                        avatar: json.avatar_url
                    })
                }
            )
        } else {
            ifNoUser && ifNoUser()
        }
    },[])

    return {
        user,Login,Logout
    }

}

export default useAuth;