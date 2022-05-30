import { MantineProvider, Select } from '@mantine/core'
import { NextPage } from 'next'
import { AiFillGithub } from 'react-icons/ai'
import useAuth from '../../hooks/useAuth'

const DashboardNew: NextPage = () => {
  // const {user,Login,Logout} = useAuth({ ifNoUser: () => {
  //     Login()
  // }})

  return (
    <div className="w-screen min-h-screen bg-black text-neutral-100 ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="pt-12 pb-24 text-4xl">
          Import a repository from GitHub
        </h1>
        <MantineProvider theme={{ colorScheme: 'dark' }}>
          <div className="flex items-center justify-center w-full">
            <AiFillGithub size={50} />
            <Select
              sx={{
                paddingLeft: '1rem',
                width: '30%',
              }}
              searchable
              size="lg"
              label="Pick a repository"
              placeholder="You can pick Private and Public repos"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />
          </div>
        </MantineProvider>
      </div>
    </div>
  )
}

export default DashboardNew
