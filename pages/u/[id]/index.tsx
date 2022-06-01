import { NextPage } from "next";
import LinkPost from "../../../components/LinkPost";

const UserPosts: NextPage = ({ id , json }: any) => {

    return (
        <div className="min-h-screen max-w-screen flex-col bg-black flex py-32 items-center">
            {json.length < 1 ? (
                <h1 className="text-4xl">User not found</h1>
            ) : (
                <>
                    <div className="flex justify-center">
                        <div className="prose px-6 p-rose prose-invert md:prose-xl">
                            <div className="flex flex-col">
                                <h1>{id}'s Posts</h1>
                                <ul>
                                    {json.map((post: any) => {
                                        return (
                                            <LinkPost
                                                key={post.id}
                                                name={post.title}
                                                dsc={post.dsc}
                                                url={`${id}/${post.id}`}
                                            />
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

interface Props {
    params : {
        id : string
    };
}

export async function getServerSideProps({ params : { id } } : Props) {

    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}get_posts?u=${id}`);
    const json : any[] = await resp.json();
    const result = json.sort((a,b) => {
        // @ts-ignore
        return new Date(b.date) - new Date(a.date)
    });

    return {
        props : {
            id, json : result
        }
    }
}

export default UserPosts;