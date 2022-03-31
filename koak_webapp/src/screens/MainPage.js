import React, {useContext, useState} from 'react';
import {ApiRequestContext} from '../context/ApiRequestContext';
import { CustomSelect } from '../components/CustomSelect';
import KoakBox from '../components/KoakBox';
import { getKoakFromServer, postCheckKoak, postKoakToServer, postTokenToServer, postUserIdToServer } from '../components/SendRequests';
import { auth } from '../service/auth';
import Koaks from '../components/Koaks';
import Layout from '../components/Layout';
import * as data from '../components/ActionReactionList';
import { async } from '@firebase/util';

export default function MainPage() {
    const [ActionService, setActionService] = useState("");
    const [ReactionService, setReactionService] = useState("");
    const [RenderCustomSelectAction, setRenderCustomSelectAction] = useState(null);
    const [RenderCustomSelectReaction, setRenderCustomSelectReaction] = useState(null);
    const [Name, setName] = useState("")
    const [PlaylistName, setPlaylistName] = useState("")
    const [NameErr, setNameErr] = useState(<span className='flex justify-center text-red-500'>Veuillez entrer un nom pour votre Koak</span>)
    const [ErroMsg, setErroMsg] = useState(<div className='flex justify-center'><span className='border-2 border-black rounded-lg p-2 bg-[#f7e8ce] text-lg text-red-600 underline underline-offset-1'>Une erreur est survenue, veuillez verifié les informations de votre Koak</span></div>)
    const [SuccMsg, setSuccMsg] = useState(<div className='flex justify-center'><span className='border-2 border-black rounded-lg p-2 bg-[#f7e8ce] text-lg text-green-600 underline underline-offset-1'>Votre Koak a été crée avec succes !</span></div>)
    const {state} = useContext(ApiRequestContext);

    const CheckSelectedActionService = (e) => {
        switch(e.target.value) {
            case 'spotify':
                setActionService("spotify");
                setRenderCustomSelectAction(<CustomSelect ar={"action"} color={"border-blue-500"} array={data.SpotifyOptions}/>)
                break
            case 'gmail':
                setActionService("gmail");
                setRenderCustomSelectAction(<CustomSelect ar={"action"} color={"border-blue-500"} array={data.GmailOptions}/>)
                break
            case 'twitch':
                setActionService("twitch");
                setRenderCustomSelectAction(<CustomSelect ar={"action"} color={"border-blue-500"} array={data.TwitchOptions}/>)
                break
            case 'youtube':
                setActionService("youtube");
                setRenderCustomSelectAction(<CustomSelect ar={"action"} color={"border-blue-500"} array={data.YoutubeOptions}/>)
                break
            case 'reddit':
                setActionService("reddit");
                setRenderCustomSelectAction(<CustomSelect ar={"action"} color={"border-blue-500"} array={data.RedditOptions}/>)
                break
            case 'github':
                setActionService("github");
                setRenderCustomSelectAction(<div><div className='flex flex-row space space-x-4'>
                    <CustomSelect ar={"action"} color={"border-blue-500"} array={data.GithubOptions}/>
                    <input className="border-2 border-black col-span-2 text-center bg-[#f7e8ce] w-full" type="text" id="pname" placeholder='Nom du repo' onChange={(e) => {setPlaylistName(e.target.value)}}/>
                    </div><span className='flex justify-center text-red-500 underline mt-2 underline-offset-1'>ATTENTION : le repo doit être existant et public</span></div>)
                break
            }
    }
    const CheckSelectedReactionService = (e) => {
        switch(e.target.value) {
            case 'spotify':
                setReactionService("spotify");
                setRenderCustomSelectReaction(<div><div className='flex flex-row space space-x-4'>
                <CustomSelect ar={"reaction"} color={"border-red-500"} array={data.SpotifyReactionOptions}/>
                <input className="border-2 border-black col-span-2 text-center bg-[#f7e8ce] w-full" type="text" id="pname" placeholder='Nom de la playlist' onChange={(e) => {setPlaylistName(e.target.value)}}/>
                </div><span className='flex justify-center text-red-500 underline mt-2 underline-offset-1'>ATTENTION : la playlist doit être existante</span></div>)
                break
            case 'gmail':
                setReactionService("gmail");
                setRenderCustomSelectReaction(<div className='flex flex-col space space-x-4'>
                    <CustomSelect ar={"reaction"} color={"border-red-500"} array={data.GmailReactionOptions}/>
                    <span className='flex justify-center text-red-500 underline mt-2 whitespace-pre underline-offset-1'>ATTENTION : La suppression d'un mail est définitive, une récuperation est impossible.</span></div>)
                break
            case 'reddit':
                setReactionService("reddit");
                setRenderCustomSelectReaction(<CustomSelect ar={"reaction"} color={"border-red-500"} array={data.RedditReactionOptions}/>)
                break
            case 'youtube':
                setReactionService("youtube");
                setRenderCustomSelectReaction(<div><div className='flex flex-row space space-x-4'>
                <CustomSelect ar={"reaction"} color={"border-red-500"} array={data.YoutubeReactionOptions}/>
                <input className="border-2 border-black col-span-2 text-center bg-[#f7e8ce] w-full" type="text" id="pname" placeholder='Id de la playlist' onChange={(e) => {setPlaylistName(e.target.value)}}/>
                </div><span className='flex justify-center text-red-500 underline mt-2 whitespace-pre underline-offset-1'>ATTENTION : La playlist doit être existante. L'Id d'une playlist se trouve dans l'url de cette dernière.</span></div>)
                break
            }
    }
    const generateRequest = async () => {
        postKoakToServer("http://localhost:8080/" + ActionService + '/' + state.ActionString + '/' + ReactionService + '/' + state.ReactionString, Name, PlaylistName, sessionStorage.getItem("UserId")).then(
            // window.location.reload()
        )
    }

    return (
        <Layout>
            <div className='h-5/6 flex justify-center'>
                <div className='flex justify-center max-h-full h-fit w-4/5 my-auto'>
                    <div className='flex flex-col space-y-4 w-3/5 bg-[#f7e8ce] rounded-lg border-4 border-solid border-black drop-shadow-2xl py-10 px-16'>
                        {sessionStorage.getItem("RespMsg") === 'koaksuccess' ? SuccMsg : ""}
                        {sessionStorage.getItem("RespMsg") === 'koakerr' ? ErroMsg : ""}
                        <h1 className='text-center text-2xl'>Nom du Koak</h1>
                        <input
                            className="border-2 border-black col-span-2 text-center bg-[#f7e8ce]"
                            type="text"
                            id="name"
                            onChange={(e) => {setName(e.target.value)}}
                        />
                        <select className='rounded-md border-2 border-blue-500 space-x-2 bg-yellow-400 p-2 appearance-none hover:drop-shadow-xl hover:brightness-90' onChange={CheckSelectedActionService}>
                            {data.ActionServiceOptions.map((x, key) => <option key={key} value={x.value}>{x.label}</option>)}
                        </select>
                        {RenderCustomSelectAction}
                        {state.DisplayReactionService ? 
                        <select className='rounded-md border-2 border-red-500 space-x-2 bg-yellow-400 p-2 appearance-none hover:drop-shadow-xl hover:brightness-90' onChange={CheckSelectedReactionService}>
                            {data.ReactionServiceOptions.map((x, key) => <option key={key} value={x.value}>{x.label}</option>)}
                        </select> : "" }
                        {RenderCustomSelectReaction}
                        <button className='rounded-md border-2 border-black space-x-2 bg-yellow-400 p-2 m-auto w-1/2 hover:drop-shadow-xl hover:brightness-125' onClick={generateRequest}>Créer le Kouak</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}