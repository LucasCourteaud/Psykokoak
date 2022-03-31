import React from 'react'

export default function ConnectionBox({ServiceName, children, icon, state}) {
    return (
        <div className="items-center justify-center flex">
            <div className="border-4 border-black bg-[#f7e8ce] text-black w-96 rounded-lg">        
                <header className="font-bold text-2xl px-5 py-4">{ServiceName}</header>
                <main className="px-5">
                    <div className="grid grid-cols-6">
                        <i className={`h-14 w-14 ${icon} fa-3x`} />
                        <div className="col-span-3 px-3 font-semibold flex flex-col"> 
                            <div className="">Veuillez vous connecter à votre compte</div>
                        </div>
                        <div className="col-span-2 py-2 justify-self-end">
                            {children}
                        </div>
                    </div>
                </main>
                {state === "true" ? <footer className="px-5 py-4 text-green-600 underline decoration-green-600">Connecté</footer> :
                    <footer className="px-5 py-4 text-red-600">Déconnecté</footer>
                }
            </div>
        </div>
    )
}
