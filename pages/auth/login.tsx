import { NextPage } from "next"
import { useEffect } from "react"

const Login: NextPage = () => {
    useEffect(() => {
        window.location.href = "https://github.com/login/oauth/authorize?client_id=" + process.env.NEXT_PUBLIC_CLIENT_ID + "&scope=repo,user"
    },[])

    return null
}

export default Login