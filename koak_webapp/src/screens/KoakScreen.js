import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Koaks from '../components/Koaks'
import Layout from '../components/Layout'
import { getKoakFromServer } from '../components/SendRequests'

export default function KoakScreen() {
    let location = useLocation()
    const [KoakList, setKoakList] = useState(undefined)

    const handleGetKoaks = () => {
        getKoakFromServer(sessionStorage.getItem("UserId"))
        console.log(JSON.parse(sessionStorage.getItem("KoakList")))
        setKoakList(JSON.parse(sessionStorage.getItem("KoakList")))
    }
    useEffect(() => {
        handleGetKoaks()
    }, [location])

    return (
        <Layout>
            <div className='flex justify-center h-5/6'>
                <div className='flex w-7/12 h-full'>
                    <Koaks KoakList={KoakList ? KoakList :
                        [{ name: "ERROR ! Essayez de rafraichir la page", request: "", description: "Si vous voyez ce Koak alors une erreur est survenue lors de la recuperation de vos Koaks.",
                        action_service: "", reaction_serve: "", value: 0}]}></Koaks>
                </div>
            </div>
        </Layout>
    )
}
