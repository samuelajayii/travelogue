"use client"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form');

        if(form) form.reset();
    }

    return (
        <button type="reset" onClick={reset}>
            <Link href="/home" className="rounded-full bg-black px-[15px] py-2.5 text-base text-white">
                <FontAwesomeIcon icon={faXmark}/>
            </Link>
        </button>
    )
}
export default SearchFormReset
