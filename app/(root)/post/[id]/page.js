/* eslint-disable @next/next/no-img-element */
import { formatDate } from '@/app/utils/utils';
import { client } from '@/sanity/lib/client';
import { POST_BY_ID_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export const experimental_prr = true

const page = async ({ params }) => {

    const id = (await params).id
    const post = await client.fetch(POST_BY_ID_QUERY, { id })

    return (
        <div className='mt-20 flex flex-col gap-10'>
            <div className='py-16 plane-bg flex flex-col gap-5 items-center justify-center'>
                <h1 className='text-white bg-black p-4 rounded'>{formatDate(post._createdAt)}</h1>
                <h1 className='text-black font-semibold bg-white text-4xl rounded-sm p-7'>{post.title}</h1>
            </div>

            <img src={urlFor(post.images[0]).url()} alt='post-image' className='w-[50vw] my-14 lg:h-[60vh] self-center place-self-center rounded-xl' />

            <div className='flex items-center flex-col justify-center '>
                <div className='w-[50vw] flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Image height={64} width={64} className='rounded-full' alt='profile-photo' src={urlFor(post.blogger.image).url()} />
                        <div className='font-semibold'>{post.blogger.name}</div>
                    </div>
                    <div className='flex items-center gap-1 text-white bg-black px-4 py-2 font-semibold rounded-full'>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <h1>{post.destination}</h1>
                    </div>
                </div>
                <h1 className='text-black w-[50vw] my-10 text-justify'>
                    {post.content}
                </h1>
            </div>
        </div>
    );
}

export default page;