import Form from 'next/form';
import React from 'react';
import SearchFormReset from './SearchFormReset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'



const SearchForm = ({query}) => {

    return (
        <div className='flex items-center justify-center' >
            <Form action='/home' scroll={false} className='search-form flex items-center justify-center gap-3 outline-none py-3 px-3 w-[50vw] pl-10 text-black rounded-full bg-white'>
                <input name='query' defaultValue={query} placeholder='Search Posts' className='flex-1 w-full  outline-none text-xl h-full' />

                <div className="flex gap-2">
                    {query && <SearchFormReset />}

                    <button type="submit" className="rounded-full bg-black px-3 py-2 text-base text-white">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default SearchForm;