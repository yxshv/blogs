import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'

const Home: NextPage = () => {

	const router = useRouter()
	const {user,Login,Logout} = useAuth()

	return (
		<div className='min-h-screen w-screen bg-black'>
			<Navbar />
			<div className="h-[75vh] flex justify-center items-center">
				<div className=' text-white gap-8 flex-col flex justify-center items-center'>
					<h1 className=' text-5xl home-text font-bold text-center'>Write and deploy blogs <span className='home-text-purple relative text-purple-500'>in seconds</span></h1>

					<div className="flex gap-5 text-xl">
						<button 
							className='
								home-button 
								border-2 
								border-purple-500 
								px-4 py-3 
								rounded-md 
								text-purple-500 
								hover:bg-purple-500
								font-medium 
								hover:text-black 
								transition 
								duration-500
							'
							onClick={() => {
								window.location.href = "https://kekda-blog.vercel.app/blogs/write-blogs-seconds"
							}}
						>
							Get Started
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
