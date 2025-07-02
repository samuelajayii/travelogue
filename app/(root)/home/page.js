import React from 'react';
import { auth } from '@/auth';
import SearchForm from '../../components/SearchForm';
import { POST_QUERY } from '@/sanity/lib/queries';
import PostCard from '@/app/components/PostCard';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { redirect } from 'next/navigation';



const page = async ({ searchParams }) => {

    const query = (await searchParams).query;
    const params = { search: query || null };
    const session = await auth();

    if (!session) {redirect('/')}

    const { data: posts } = await sanityFetch({ query: POST_QUERY, params })


    return (
        <div className='mt-20 '>
            <section className='flex items-center justify-center flex-col gap-6 py-20 mb-14' id='section-bg'>
                <div className='bg-black text-white py-4 px-7 min-w-[50vw] max-w-[70vw] flex items-center justify-center flex-wrap'>
                    <h1 className='text-5xl'>Travel the world, <br></br>tell your stories</h1>
                </div>
                <h3 className='text-2xl text-white'>Talk about your experiences</h3>
                <SearchForm query={query} />
            </section>

            <p className="mb-10 text-4xl ml-7 lg:ml-14">
                {query ? `Search results for "${query}"` : "All Startups"}
                <h1>New revision</h1>
            </p>

            <section className='lg:m-14 m-7 place-content-center grid md:grid-cols-3 sm:grid-cols-2 gap-5'>

                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                ) : (
                    <p className="no-results">No startups found</p>
                )}

            </section>

            <SanityLive />
        </div>
    );
}

export default page;