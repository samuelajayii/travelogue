import React from 'react';
import { auth } from '@/auth';
import SearchForm from '../components/SearchForm';


const page = async ({ searchParams }) => {

    const query = (await searchParams).query;
    const params = { search: query || null };
    const session = await auth();

    return (
        <div className='mt-20 '>
            <section className='flex items-center justify-center flex-col gap-6 py-20' id='section-bg'>
                <div className='bg-black text-white py-4 px-7 min-w-[50vw] max-w-[70vw] flex items-center justify-center flex-wrap'>
                    <h1 className='text-5xl'>Travel the world, <br></br>tell your stories</h1>
                </div>
                <h3 className='text-2xl text-white'>Talk about your experiences</h3>
                <SearchForm query={query} />
            </section>

            <h1>Home page</h1>
        </div>
    );
}

export default page;