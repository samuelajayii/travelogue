import React from 'react';
import { auth } from '@/auth';
import SearchForm from '../components/SearchForm';


const page = async ({ searchParams }) => {

    const query = (await searchParams).query;
    const params = { search: query || null };
    const session = await auth();

    return (
        <div className='mt-20'>
            <SearchForm query={query}/>
            
            <h1>Home page</h1>
        </div>
    );
}

export default page;