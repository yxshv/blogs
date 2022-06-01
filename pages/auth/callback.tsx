import { useEffect } from "react";
import queryString from 'query-string'
import { useRouter } from "next/router";

const AuthCallback = ({ accessToken } : any) => {

    const router = useRouter()

    useEffect(() => {
        localStorage.setItem('accessToken', accessToken)
        router.push('/dashboard')
    })

    return null

}

export async function getServerSideProps (context : any) {
    const { code } = context.query;

    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}exchange_code?code=${code}`)     

    const txt = await resp.json()
    
    const accessToken = queryString.parse(txt).access_token;

    if (accessToken === undefined) return
    
    return {
        props : {
            accessToken : (`${accessToken}`)
        }
    }

}

export default AuthCallback
