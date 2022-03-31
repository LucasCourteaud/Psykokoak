import React from 'react'

export default function ForgotPwd() {
    return (
        <div className='h-full flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <div className='m-auto mb-6'>
                    <header className='text-yellow-500 text-6xl text-center'>Psykokoak</header>
                </div>
                <div className='h-px bg-black absolute inset-x-0 left-1/2 -translate-x-1/2 w-[28rem]'/>
                <div className='flex justify-center items-center mt-10 mb-6 space-x-2'>
                    <h1 className='text-2xl font-medium text-primary text-center'>Mot de passe oublié</h1>
                    <i className="fas fa-key"/>
                </div>
                <div className='m-auto'>
                    <h1 className='text-center'>Veuillez entrer votre adresse email :</h1>
                </div>
                <input
                    className="outline-none mt-4"
                    type="mail"
                    id="mail"
                    placeholder="Addresse mail"
                />
                <div className='col-span-8 h-px bg-black'/>
                <div className='flex justify-center pb-4'>
                    <button className='py-2 px-4 text-m rounded border-2 mt-4'>Confirmer</button>
                </div>
            </div>
        </div>
    )
}
