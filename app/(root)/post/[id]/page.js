import { client } from '@/sanity/lib/client';
import { POST_BY_ID_QUERY } from '@/sanity/lib/queries';
import React from 'react';

export const experimental_prr = true

const page = async ({params}) => {

    const id = (await params).id
    const post = await client.fetch(POST_BY_ID_QUERY, {id})

    return (
        <div className='mt-20'>
            <h1>Post number is {id}</h1>
            <h1>Post name is {post.title}</h1>
        </div>
    );
}

export default page;