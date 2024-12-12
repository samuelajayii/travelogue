/* eslint-disable @next/next/no-img-element */
import { formatDate } from '@/app/utils/utils';
import { client } from '@/sanity/lib/client';
import { POST_BY_ID_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { writeClient } from '@/sanity/lib/write-client';

export const experimental_prr = true

const page = async ({ params }) => {

    const id = (await params).id
    const post = await client.fetch(POST_BY_ID_QUERY, { id })

    const handleDelete = async () => {
        "use server"
        await writeClient.delete(id);
        redirect('/home')
    }

    const session = await auth()
    const user = session?.user

    if (!session) redirect('/')

    return (
        <div className='mt-20 flex flex-col gap-3 lg:gap-10'>
            <div className='py-16 plane-bg flex flex-col gap-5 items-center justify-center'>
                <h1 className='text-white bg-black p-4 rounded'><span>Post made on: </span>{formatDate(post._createdAt)}</h1>
                <h1 className='text-black font-semibold bg-white text-4xl rounded-sm p-7'>{post.title}</h1>
            </div>

            <img src={urlFor(post.images[0]).url()} alt='post-image' className='lg:w-[50vw] w-[80vw] h-[35vh] my-14 lg:h-[60vh] self-center place-self-center rounded' />

            <div className='flex items-center mx-7 flex-col justify-between lg:justify-center '>
                <div className='lg:w-[50vw] lg:self-center self-start lg:flex-row flex-col lg:gap-0 gap-3 flex items-center justify-between'>
                    <Link href={`/user/${user?.id}`}>
                        <div className='flex items-center justify-center gap-4'>
                            <Image height={64} width={64} className='rounded-full' alt='profile-photo' src={post.blogger.image} />
                            <div className='font-semibold'>{post.blogger.name}</div>
                        </div>
                    </Link>

                    <div className='self-start lg:self-center flex items-center gap-1 text-white bg-black px-4 py-2 font-semibold rounded-full'>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <h1>{post.destination}</h1>
                    </div>

                    <div className='flex lg:self-center items-center gap-2 self-start justify-center'>
                        <FontAwesomeIcon icon={faCalendar} />
                        <h1>{formatDate(post.date)}</h1>
                    </div>
                </div>
                <h1 className='text-black lg:w-[50vw] my-10 text-justify'>
                    {post.content}
                </h1>

                <div className='flex items-center justify-center gap-40 w-full mb-10 '>
                    {user?.id === post.blogger._id && ( // Ensure only the post owner can delete
                        <form action={handleDelete}>
                            <button type='submit' className='py-2 px-4 bg-red-600 text-white rounded-md'>Delete Post</button>
                        </form>
                    )}

                    <button className='py-2 px-4 bg-black text-white rounded-md'>Edit</button>
                </div>
            </div>
        </div>
    );
}

export default page;