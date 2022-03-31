import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { getApkFromServer } from './SendRequests';

export default function Layout({children}) {
    return (
		<main className="h-full relative">
            <Navbar></Navbar>
			{children}
			<div className='flex absolute items-center right-1 bottom-1 cursor-pointer p-[3px] border-2 border-black bg-yellow-500 rounded-lg hover:drop-shadow-xl hover:brightness-125'>
                <i className="fab fa-android text-4xl my-auto mr-2"></i>
                <Link className='text-xl' to="/client.apk" target="_blank" download>Apk android</Link>
            </div>
		</main>
	);
}
