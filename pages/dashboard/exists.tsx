import { Button, MantineProvider, Select } from '@mantine/core'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import useAuth from '../../hooks/useAuth'
import { MdNavigateNext } from 'react-icons/md'
import { useRouter } from 'next/router'

interface Repo {
	path: string;
	private: boolean;
}

const DashboardExists: NextPage = ({ repo }: any) => {

    const { user, Login, Logout } = useAuth(() => { Login() })
	const router = useRouter();

    const [repos, setRepos] = useState<Repo[]>([])
	const [selectedRepo, setSelectedRepo] = useState<string>(repo);
	const [loading,setLoading] = useState<boolean>(false);

    async function doIt() {
		if (selectedRepo === "" || selectedRepo === undefined || selectedRepo === null) return
		setLoading(true)
		fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}update_user?username=${user?.username}&repo=${selectedRepo}`,
		).then(
			async (resp) => {
				fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}update_blog?username=${user!.username}`)
				setLoading(false)
			}
		)
	}

    useEffect(() => {
		if (user) {
			setLoading(true);
			fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}get_repos?username=${user.username}`).then(
				async (resp) => {
					const json = await resp.json();
					const result : Repo[] = [];

					json.forEach((repo : any) => {
						result.push({
							path: repo.full_name,
							private: repo.private
						})
					});

					setRepos(result)
					setLoading(false)
				}
			)
		}
		
	},[user])

    return (
        <div className="w-screen min-h-screen bg-black text-neutral-100 ">
			<div className="flex flex-col items-center justify-center">
				<h1 className="pt-12 pb-24 text-center text-4xl">
					Configure the repository
				</h1>
				<MantineProvider theme={{ colorScheme: 'dark' }}>
					<div className="flex items-center justify-center">
						<AiFillGithub size={50} />
						<Select
							sx={{
								paddingLeft: '1rem',
								width: '100%',
							}}
							searchable
							size="lg"
							label="Pick a repository"
							placeholder="You can only pick Public repos"
							className='sm:w-96'
							disabled={loading}
                            defaultValue={repo}
							data={(() => {
								interface Result {
									value: string;
									label: string;
								}
								const result: Result[] = []
								repos.forEach((repo : Repo) => {
									result.push({
										value : repo.path,
										label : repo.path
									})
								});
								return result
							})()}
							onChange={(value : string) => {
								setSelectedRepo(value)
							}}
						/>
					</div>

					<Button
						className=' mt-5 bg-green-500'
						color='green'
						size='md'
						loading={loading}
						disabled={selectedRepo === "" || selectedRepo === undefined || selectedRepo === null}
						onClick={(e : any) => {
							e.preventDefault();
							doIt()
						}}
					>
						Update <MdNavigateNext fontSize='20px' />
					</Button>
				</MantineProvider>
			</div>
		</div>
    )
}

interface Props {
    query : {
        repo : string;
    }
}

export async function getServerSideProps({ query : { repo } } : Props) {
    return {
        props: {
            repo : repo
        }
    }
}

export default DashboardExists;