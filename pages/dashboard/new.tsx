import { MantineProvider, Select } from "@mantine/core";
import { NextPage } from "next";
import useAuth from "../../hooks/useAuth";

const DashboardNew: NextPage = () => {
    
    const {user,Login,Logout} = useAuth({ ifNoUser: () => {
        Login()
    }})

    return (
        <div className=" min-h-screen w-screen bg-black text-white">
            <MantineProvider>
                <Select
                    label="Pick a repository"
                    placeholder="You can pick Private and Public repos"
                    data={[]}
                />
            </MantineProvider>
        </div>
    )
}

export default DashboardNew;