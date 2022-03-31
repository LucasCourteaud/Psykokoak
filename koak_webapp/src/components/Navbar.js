import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../screens/Psykokoak.jpg'
import { FbLogout } from '../service/auth'
import { getApkFromServer } from './SendRequests'

export default function Navbar() {
    let navigate = useNavigate()
    const handleSignOut = () => {
        FbLogout();
        sessionStorage.clear()
        navigate("/login");
    }
    return (
        <nav className='flex bg-[#f7e8ce] border-x-4 border-b-4 border-black py-2'>
            <div className='flex w-3/6 space-x-4'>
                <div className='flex justify-evenly border-4 border-double border-black ml-2 w-6/12'>
                    <img src={Avatar} alt="koak avatar" className="w-12"/>
                    <span className='my-auto text-yellow-500 text-3xl cursor-default'>Psykokoak</span>
                    <img src={Avatar} alt="koak avatar" className="w-12"/>
                </div>
                <div className='flex my-auto cursor-pointer'>
                    <span className='p-[3px] border-2 border-black bg-yellow-500 rounded-lg hover:drop-shadow-xl hover:brightness-125' onClick={handleSignOut}>Déconnexion</span>
                </div>
            </div>
            <div className='flex justify-end space-x-4 w-full mr-4'>
                <Link className='border-2 border-black bg-yellow-500 rounded-lg p-2 hover:drop-shadow-xl hover:brightness-125 my-auto' to="/connection">Connection aux services</Link>
                <Link className='border-2 border-black bg-yellow-500 rounded-lg p-2 hover:drop-shadow-xl hover:brightness-125 my-auto' to="/mainpage">Création de Koaks</Link>
                <Link className='border-2 border-black bg-yellow-500 rounded-lg p-2 hover:drop-shadow-xl hover:brightness-125 my-auto' to="/koaks">Liste de vos Koaks</Link>
            </div>
        </nav>
    )
}
