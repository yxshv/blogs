import { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'

const Dashboard: NextPage = () => {
	const router: NextRouter = useRouter()
	const { user, Login, Logout } = useAuth(() => { Login() })

	useEffect(() => {
		if (user === null) return
		console.log(user)
		fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}user_repo?username=${user.username}&token=${localStorage.accessToken}`
		).then(async (resp) => {
			const json = await resp.json()

			if (json.success === 0) {
				router.push('/dashboard/new')
			} else {
				router.push('/dashboard/exists?repo=' + json.data.repo)
			}
		})
	}, [user])

	return <div className="w-screen flex justify-center items-center min-h-screen text-white bg-black">
		<svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
	</div>
}

export default Dashboard
