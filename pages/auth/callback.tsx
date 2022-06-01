import { useEffect } from "react";
import { prisma } from '../../db/client'
import queryString from 'query-string'
import Cryptr from 'cryptr';
import { useRouter } from "next/router";


const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CRYP_KEY!)

const AuthCallback = ({ accessToken } : any) => {

    const router = useRouter()

    useEffect(() => {
        router.push('/')
        localStorage.setItem('accessToken', accessToken)
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