
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import PostForm from '@/app/components/PostForm';

const page = async () => {

    const session = await auth()

    if (!session) redirect('/')

    return (
        <div className='mt-20'>
            <div className='post-bg py-16 flex flex-col gap-5 items-center justify-center'>
                <h1 className='text-white bg-black rounded py-4 px-7 text-3xl'>Tell us about your trip</h1>
            </div>

            <div>
                <PostForm/>
            </div>
        </div>
    );
}

export default page;