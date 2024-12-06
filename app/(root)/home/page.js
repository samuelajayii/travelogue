import React from 'react';
import { auth } from '@/auth';
import SearchForm from '../../components/SearchForm';
import { client } from '@/sanity/lib/client';
import { POST_QUERY } from '@/sanity/lib/queries';
import PostCard from '@/app/components/PostCard';


const page = async ({ searchParams }) => {

    const query = (await searchParams).query;
    const params = { search: query || null };
    const session = await auth();

    const posts = await client.fetch(POST_QUERY)
    console.log(JSON.stringify(posts, null, 2))

    return (
        <div className='mt-20 '>
            <section className='flex items-center justify-center flex-col gap-6 py-20 mb-14' id='section-bg'>
                <div className='bg-black text-white py-4 px-7 min-w-[50vw] max-w-[70vw] flex items-center justify-center flex-wrap'>
                    <h1 className='text-5xl'>Travel the world, <br></br>tell your stories</h1>
                </div>
                <h3 className='text-2xl text-white'>Talk about your experiences</h3>
                <SearchForm query={query} />
            </section>

            <section>
                
            </section>

            <PostCard />
        </div>
    );
}

export default page;