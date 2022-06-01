import { NextPage } from 'next';
import Giscus from '@giscus/react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import Head from 'next/head';

interface Category {
    id: string;
    name: string;
}

const Link = ({ children, href }: any) => {
    const _href = href;

    return (
        <a href={_href} target="_blank">
            {children}
        </a>
    )
}

const Blog: NextPage = ({ id, blog, s }: any) => {

    const [repoId, setRepoId] = useState<string>("");

    useEffect(() => {
        fetch(`https://api.github.com/repos/${blog.repo}`).then(
            async (resp) => {
                const data = await resp.json();
                setRepoId(data.node_id);
            }
        )
    },[])

    return (
        <div className="min-h-screen max-w-screen bg-black flex py-16 justify-center">
            {blog === 1 ? (
                <h1 className="text-4xl">Blog not found</h1>
            ) : (
                <>
                    <div className="flex justify-center">
                        <Head>
                            <title>{blog.title}</title>
                            <meta name="description" content={blog.metaDsc} />
                            <meta property="og:title" content={blog.metaTitle} />
                            <meta property="og:image" content={blog.metaImage} />
                        </Head>
                        <div className="prose text-white px-6 p-rose prose-invert md:prose-xl">
                            <MDXRemote {...s} components={{a : Link}} />
                            <Giscus
                                id="comments"
                                repo={blog.repo}
                                repoId={repoId}
                                category="General"
                                mapping="pathname"
                                term={blog.title}
                                reactionsEnabled="1"
                                emitMetadata="0"
                                inputPosition="top"
                                theme="dark"
                                lang="en"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

interface Props {
    params: {
        id: string;
        blog: string;
    }
}

export async function getServerSideProps({ params: { id, blog } }: Props) {

    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}get_post?u=${id}&id=${blog}`);
    const json = await resp.json();
    const s = await serialize(
        json.content,
        {
            mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [require('@mapbox/rehype-prism')],
            }
        }
    )

    return {
        props: {
            id,
            blog: json,
            s
        }
    }
}

export default Blog