import Image from 'next/image';
import Link from 'next/link';
import React, {  } from 'react';
import { auth, signOut, signIn } from "@/auth"



const Header = async () => {

    const session = await auth();
    console.log(session);
    const user = session?.user;

    return (
        <header>
            <nav className='header'>
                <div className='flex items-center gap-3'>
                    <Image src='/logo-design.jpg' width={40} height={40} alt='logo' />
                </div>

                <ul className='flex items-center gap-5'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>
                        {session ? (
                            <div className='flex items-center gap-3'>
                                <h1>Welcome {user?.name || "Guest"}</h1>
                                <form action={async () => { "use server"; await signOut() }}>
                                    <button type="submit">Sign Out</button>
                                </form>
                            </div>
                        ) : (

                            <form action={async () => { "use server"; await signIn("google") }}>
                                <button type="submit">Sign In</button>
                            </form>
                        )}

                    </li>
                </ul>


            </nav>
        </header>
    );
}

export default Header;