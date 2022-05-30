import { NextRouter, Router, useRouter } from "next/router"
import useAuth from "../hooks/useAuth"

const Navbar = () => {

    const {user, Login, Logout} = useAuth({ ifNoUser: null })
    const router : NextRouter = useRouter()
    
    return (
        <>
            <div className='h-[15vh] w-full text-white flex justify-end flex-row gap-5 items-center px-10'>
                <button className='text-xl' onClick={user ? () => { router.push('/dashboard') } : Login }>Sign In</button>
                <button className='text-xl border-2 px-4 py-2 border-purple-500 rounded-md' >Get Started</button>
            </div>
        </>
    )
}

export default Navbar