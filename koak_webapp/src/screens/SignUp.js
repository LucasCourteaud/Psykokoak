import React, { useEffect } from 'react'
import { useState } from 'react';
import { FbRegister } from '../service/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Avatar from './Psykokoak.jpg'
import { postUserIdToServer } from '../components/SendRequests';

export default function SignUp() {
    let navigate = useNavigate();
    const [Mail, setMail] = useState('');
    const [Password, setPassword] = useState('');
    const [Redirect, setRedirect] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState(undefined)

    const handleRegister = () => {
        FbRegister(Mail, Password).then(() => {
            if (sessionStorage.getItem('UserId')) {
                postUserIdToServer("register", sessionStorage.getItem('UserId'))
                navigate("/connection")
            } else if (!sessionStorage.getItem('UserId'))
                setErrorMsg(<span className='text-red-500'>Une erreur est survenue, votre adresse email est probablement déja liée à un compte existant ou est invalide</span>)
        })
    }

    return (
        <div className='h-full flex relative bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-[#f7e8ce] rounded-lg border-4 border-solid border-black drop-shadow-2xl px-14 pb-14 pt-10'>
                <div className='flex flex-row space-x-2 mb-6 border-4 border-double border-black'>
                    <img src={Avatar} alt="koak avatar" className="w-16 h-16"/>
                    <span className='my-auto text-yellow-500 text-4xl'>Psykokoak</span>
                    <img src={Avatar} alt="koak avatar" className="w-16 h-16"/>
                </div>
                <div className='h-[2px] bg-black absolute inset-x-0 left-1/2 -translate-x-1/2 w-[28rem]'/>
                <div className='flex justify-center items-center space-x-2 py-4'>
                    <h1 className='text-2xl font-medium text-primary text-center'>Créer un compte</h1>
                    <i className="fas fa-sign-in-alt"></i>
                </div>
                <form className='flex flex-col space-y-6'>
                    <div className='grid grid-rows grid-flow-col space-x-2'>
                        <h1 className='row-span-3'>Prénom :</h1>
                        <input
                            className="col-span-2 outline-none bg-[#f7e8ce] w-[15rem]"
                            type="prenom"
                            id="prenom"
                            placeholder="Prénom"
                        />
                        <div className='col-span-8 h-px bg-black'/>
                    </div>
                    <div className='grid grid-rows grid-flow-col space-x-2'>
                        <h1 className='row-span-3'>Nom :</h1>
                        <input
                            className="col-span-2 outline-none bg-[#f7e8ce] w-64"
                            type="nom"
                            id="nom"
                            placeholder="Nom"
                        />
                        <div className='col-span-8 h-px bg-black'/>
                    </div>
                    <div className='grid grid-rows grid-flow-col space-x-2'>
                        <h1 className='row-span-3'>Adresse mail :</h1>
                        <input
                            className="col-span-2 outline-none bg-[#f7e8ce] w-[13rem]"
                            type="email"
                            id="mail"
                            placeholder="Mail"
                            onChange={(event) => {setMail(event.target.value);}}
                        />
                        <div className='col-span-8 h-px bg-black'/>
                    </div>
                    <div className='grid grid-rows grid-flow-col space-x-2'>
                        <h1 className='row-span-3'>Mot de passe :</h1>
                        <input  
                            className="col-span-2 outline-none bg-[#f7e8ce] w-[13rem]"
                            type='password'
                            id="mdp"
                            placeholder="Mot de passe"
                            onChange={(event) => {setPassword(event.target.value);}}
                        />
                        <div className='col-span-8 h-px bg-black'/>
                    </div>
                    {ErrorMsg}
                    <div className='grid grid-rows grid-flow-col space-x-2'>
                        <h1 className='row-span-3'>Confirmer :</h1>
                        <input
                            className="col-span-2 outline-none bg-[#f7e8ce] w-[14rem]"
                            type="password"
                            id="cmdp"
                            placeholder="Confirmer mot de passe"
                        />
                        <div className='col-span-8 h-px bg-black'/>
                    </div>
                    <div className='flex justify-center m-auto text-center border rounded-md border-4 border-black space-x-2 bg-yellow-400 p-2 cursor-pointer hover:drop-shadow-xl hover:brightness-125'>
                        <div className='py-2 px-4' onClick={handleRegister}>Confirmer</div>
                    </div>
                    <div className='flex justify-center'>
                        <Link className="underline underline-offset-2 text-blue-600 text-center hover:drop-shadow-xl hover:brightness-200" to="/login">J'ai déja un compte</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
