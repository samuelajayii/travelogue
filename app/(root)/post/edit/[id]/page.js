import EditForm from '@/app/components/EditForm';
import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { POST_BY_ID_QUERY } from '@/sanity/lib/queries';
import { redirect } from 'next/navigation';

const page = async ({ params }) => {

    const id = (await params).id
    const post = await client.fetch(POST_BY_ID_QUERY, { id })
    const session = await auth()
    const user = session?.user

    if (!session) redirect('/')

    if (!post) {
        return (
            <div className="mt-20">
                <div className="py-16 edit-bg flex flex-col gap-5 items-center justify-center">
                    <h1 className="text-white bg-black p-4 rounded text-2xl">
                        Post Not Found
                    </h1>
                </div>
            </div>
        );
    }
    return (
        <div className='mt-20'>
            <div className='py-16 edit-bg flex flex-col gap-5 items-center justify-center'>
                <h1 className='text-white bg-black p-4 rounded text-2xl'> Edit your post</h1>
            </div>

            <EditForm titleProps={post.title} destinationProps={post.destination} dateProps={post.date} imageProps={post.images} contentProps={post.content} />

        </div>
    );
}

export default page;