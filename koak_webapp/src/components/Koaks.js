import React, { useState } from 'react'
import KoakBox from './KoakBox'
import { getKoakFromServer, postCheckKoak } from './SendRequests'

export default function Koaks({KoakList}) {
    return (
        <div className='flex flex-col w-full space-y-4 overflow-y-auto h-full mt-10 rounded-md' style={{}}>
            {KoakList.map((x, key) => <KoakBox key={key} title={x.name} as={x.action_service} desc={x.description} rs={x.reaction_serve}></KoakBox>)}
        </div>
    )
}
