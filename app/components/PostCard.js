/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { formatDate } from '../utils/utils';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const PostCard = ({ post }) => {

    const { destination, images, slug, bio, title, _createdAt, date, blogger, content, _id } = post;

    return (
        <div className='flex flex-col items-center justify-between gap-1 border rounded-xl py-5 transition-all shadow-md hover:shadow-xl px-8 w-full'>
            <div>
                <h1 className='self-start'>{formatDate(_createdAt)}</h1>
            </div>

            <div className='flex flex-row items-center justify-between w-full'>
                <div className='flex items-center justify-between w-full'>
                    <div className='w-fit'>
                        <Link className='w-fit' href={`/user/${blogger?._id}`}><h1>{blogger.name}</h1></Link>
                        <h1 className='font-bold text-2xl'>{title}</h1>
                    </div>

                    <Link href={`/user/${blogger?._id}`}>
                        <Image
                            src={urlFor(blogger.image).url()}
                            alt={blogger?.name}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                    </Link>
                </div>
            </div>
            <Link href={`/post/${_id}`}><h1 className='font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all'>{content}</h1></Link>

            <Link className='w-full' href={`/post/${_id}`}><img alt='post-image' src={urlFor(images[0]).url()} className='w-full h-[164px] rounded-[10px] object-cover' /></Link>

            <div className='w-full flex mt-3 items-center justify-between'>
                <div className='flex items-center gap-1'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <h1>{destination}</h1>
                </div>

                <Link className='py-1 px-4 text-white bg-black rounded-full' href={`/post/${_id}`}>Details</Link>
            </div>

        </div>
    );
}

export default PostCard;