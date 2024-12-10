import { auth } from '@/auth';
import React from 'react';

const page = async ({params}) => {

    const id = (await params).id;
    const session = await auth();
    


    return (
        <div className='mt-20'>
            This is the {id}
        </div>
    );
}

export default page;