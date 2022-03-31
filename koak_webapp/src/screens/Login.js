import React, { useContext, useEffect, useState } from 'react';
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
import { getRedditToken } from '../components/RedditConnection';
import { postUserIdToServer } from '../components/SendRequests';
import { getSpotifyToken } from '../components/SpotifyConnection';
import { getTwitchToken } from '../components/TwitchConnection';
import { ApiRequestContext } from '../context/ApiRequestContext';
import { signInWithGoogle, signInWithGithub, FbLogin } from '../service/auth';
import Avatar from './Psykokoak.jpg'

export default function Login() {
    const [Mail, setMail] = useState('');
    const [Password, setPassword] = useState('');
    const [ErrorMsg, setErrorMsg] = useState(undefined)
    let navigate = useNavigate();
    const search = useLocation().search;
    const [ShowPassword, setShowPassword] = useState(false)
    const handleLogin = () => {
        FbLogin(Mail, Password).then(() => {
            if (sessionStorage.getItem('UserId')) {
                postUserIdToServer("login", sessionStorage.getItem('UserId'))
                navigate("/connection")
            } else if (!sessionStorage.getItem('UserId'))
            setErrorMsg(<span className='text-red-500'>Votre adresse email ou mot de passe est invalide.</span>)
        })
    }
    useEffect(() => {
        var code = new URLSearchParams(search).get('code');
        sessionStorage.setItem(sessionStorage.getItem("ServiceConnexion"), code)
        if (code !== null)
            navigate('/connection');
    }, [search])
    return (
        <div className='h-full flex relative'>
            <div className='w-full max-w-md m-auto bg-[#f7e8ce] rounded-lg border-4 border-solid border-black drop-shadow-2xl px-14 pb-14 pt-10'>
                <div className='flex flex-row space-x-2 mb-6 border-4 border-double border-black'>
                    <img src={Avatar} alt="koak avatar" className="w-16 h-16"/>
                    <span className='my-auto text-yellow-500 text-4xl'>Psykokoak</span>
                    <img src={Avatar} alt="koak avatar" className="w-16 h-16"/>
                </div>
                <div className='h-[2px] bg-black absolute inset-x-0 left-1/2 -translate-x-1/2 w-[28rem]'/>
                <div className='flex justify-center items-center space-x-2 py-4'>
                    <h1 className='text-2xl font-medium text-primary text-center'>Connexion a votre compte</h1>
                    <i className="fas fa-user-circle"></i>
                </div>
                <form className='flex flex-col space-y-4'>
                    <div className='space-y-8 my-2'>
                        <div className='grid grid-rows grid-flow-col space-x-2'>
                            <h1 className='row-start-[5px] row-span-3'>Email :</h1>
                            <input
                                className="col-span-2 outline-none bg-[#f7e8ce] w-64"
                                type="email"
                                id="mail"
                                onChange={(event) => {setMail(event.target.value);}}
                            />
                            <div className='col-span-8 h-px bg-black'/>
                        </div>
                        <div className='grid grid-rows grid-flow-col space-x-2 relative'>
                            <h1 className="row-span-3">Mot de passe :</h1>
                            <input  
                                className="col-span-2 outline-none bg-[#f7e8ce] w-[12rem]"
                                type={`${ShowPassword ? "text" : "password"}`}
                                id="mdp"
                                onChange={(event) => {setPassword(event.target.value);}}
                            />
                            <div className="absolute right-0" onClick={() => setShowPassword(!ShowPassword)}>
                                {ShowPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                            </div>
                            <div className='col-span-8 h-px bg-black'/>
                        </div>
                    </div>
                    {ErrorMsg}
                    <div className='flex justify-center pb-4 pt-2'>
                        <div className='py-2 px-4 rounded border-2 border-black bg-yellow-400 hover:drop-shadow-xl hover:brightness-125 cursor-pointer' onClick={handleLogin}>Login</div>
                    </div>
                </form>
                <div className='space-y-4'>
                    {/* <div className='flex justify-center'>
                        <Link className="underline underline-offset-2 text-blue-600 text-center hover:drop-shadow-xl hover:brightness-200" to="/forgot-password">Mot de passe oublié</Link>
                    </div> */}
                    <div className='flex justify-center flex-row space-x-1'>
                        <div className='h-[1px] w-1/2 border-[1px] border-black my-auto'></div>
                        <a className=''>Ou</a>
                        <div className='h-[1px] w-1/2 border-[1px] border-black border-solid my-auto'></div>
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <div className='flex flex-row rounded-md border-2 border-black space-x-2 bg-yellow-400 p-2 hover:drop-shadow-xl hover:brightness-125 hover:cursor-pointer' onClick={signInWithGoogle}>
                            <i className="fa-2x fab fa-google my-auto"/>
                            <div className='flex justify-center w-full'>
                                <button className=''>Connexion avec Google</button>
                            </div>
                        </div>
                        <div className='flex flex-row rounded-md border-2 border-black space-x-2 bg-yellow-400 p-2 hover:drop-shadow-xl hover:brightness-125 hover:cursor-pointer' onClick={signInWithGithub}>
                            <i className="fa-2x fab fa-github my-auto"></i>
                            <div className='flex justify-center w-full'>
                                <button className=''>Connexion avec Github</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <Link className="underline underline-offset-2 text-blue-600 text-center hover:drop-shadow-xl hover:brightness-200" to="/signup">je n'ai pas de compte</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
