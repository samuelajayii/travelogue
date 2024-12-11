import Image from 'next/image';
import Link from 'next/link';
import React, { } from 'react';
import { auth, signOut, signIn } from "@/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlusCircle, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = async () => {

    const session = await auth();
    const user = session?.user;

    return (
        <header>
            <nav className='header'>
                <div className='flex items-center gap-3'>
                    <Link href="/"><Image src='/logo-design.jpg' width={40} height={40} alt='logo' /></Link>

                </div>

                <div className='flex items-center gap-5'>

                    <div>
                        {session && session?.user ? (
                            <div className='flex items-center gap-5 text-black'>
                                <h1 className='hidden md:block'>Welcome, {user?.name || "Guest"}</h1>
                                <Link className='hidden md:block' href="/home"><span>Home</span></Link>
                                <Link className='hidden md:block' href="/post/create"><span>Create Travelogue</span></Link>
                                <Link className='hidden md:block' href={`/user/${user?.id}`}><span>Profile</span></Link>

                                <form className='hidden md:block' action={async () => { "use server"; await signOut({ redirectTo: "/" }) }}>
                                    <button type="submit">Sign Out</button>
                                </form>

                                <div className='flex items-center gap-5 text-black text-xl'>
                                    <Link className='block md:hidden' href="/home"><FontAwesomeIcon icon={faHouse} /></Link>
                                    <Link className='block md:hidden' href="/post/create"><FontAwesomeIcon icon={faPlusCircle} /></Link>
                                    <Link className='block md:hidden' href={`/user/${user?.id}`}><FontAwesomeIcon icon={faUser} /></Link>

                                    <form className='block md:hidden' action={async () => { "use server"; await signOut({ redirectTo: "/" }) }}>
                                        <button type="submit"><FontAwesomeIcon icon={faSignOut} /></button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className='flex items-center gap-5'>
                                <div className=''>Home </div>
                                <div className=''>About </div>
                                <form className='' action={async () => { "use server"; await signIn("google", { redirectTo: "/home" }) }}>
                                    <button type="submit">Sign In</button>
                                </form>
                            </div>

                        )}

                    </div>
                </div>


            </nav>
        </header>
    );
}

export default Header;