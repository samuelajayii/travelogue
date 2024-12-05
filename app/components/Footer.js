'use client'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faMedium, faReddit, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className='bg-black text-white flex items-center justify-center gap-4 p-5'>
            <h1>Contact Us Here: </h1>
            <FontAwesomeIcon className='cursor-pointer' icon={faXTwitter}></FontAwesomeIcon>
            <FontAwesomeIcon className='cursor-pointer' icon={faInstagram}></FontAwesomeIcon>
            <FontAwesomeIcon className='cursor-pointer' icon={faFacebook}></FontAwesomeIcon>
            <FontAwesomeIcon className='cursor-pointer' icon={faReddit}></FontAwesomeIcon>

            
        </footer>
    );
}

export default Footer;