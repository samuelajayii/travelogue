import { auth } from '@/auth';
import { AUTHOR_BY_ID_QUERY, POSTS_BY_BLOGGER_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react';
import { client } from '@/sanity/lib/client';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import PostCard from '@/app/components/PostCard';


const page = async ({ params }) => {

    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
    if (!user) return notFound();

    const posts = await client.fetch(POSTS_BY_BLOGGER_QUERY, {id})

    return (
        <div className='mt-20'>
            <section className='profile-bg py-16 flex flex-col gap-5 items-center justify-center'>
                <h1 className='text-white text-4xl '>{user.name}</h1>

                <Image width={150} height={150} alt={user.name} src={user.image} style={{ borderRadius: "100%" }} />

            </section>

            <div>
                <p className="font-semibold lg:m-14 m-7 text-3xl">
                    {session.user?.id === id ? "Your" : "All"} Startups
                </p>
            </div>

            <section className='lg:m-14 m-7 place-content-center grid md:grid-cols-3 sm:grid-cols-2 gap-5'>
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                ) : (
                    <p className="no-results">No startups found</p>
                )}
            </section>
        </div>
    );
}

export default page;