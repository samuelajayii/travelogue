import Image from 'next/image';
import Link from 'next/link';
import React, { } from 'react';
import { auth, signOut, signIn } from "@/auth"

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
                                <h1>Welcome {user?.name || "Guest"}</h1>
                                <Link href="/home"><span>Home</span></Link>
                                <Link href="/post/create"><span>Create Travelogue</span></Link>
                                <Link href={`/user/${session?.id}`}><span>Profile</span></Link>

                                <form action={async () => { "use server"; await signOut({redirectTo: "/"}) }}>
                                    <button type="submit">Sign Out</button>
                                </form>
                            </div>
                        ) : (
                            <div className='flex items-center gap-5'>
                                <div>Home </div>
                                <div>About </div>
                                <form action={async () => { "use server"; await signIn("google", {redirectTo: "/home"}) }}>
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