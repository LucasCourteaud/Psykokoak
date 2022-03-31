import React, {createContext, useState} from 'react';

export const ApiRequestContext = createContext();

const ApiRequestContextProvider = ({children}) => {
    const [state, setState] = useState({
        ActionString: "",
        ReactionString: "",
        ServiceConnexion: "",
        DisplayReactionService: false,
        NavFeedBack: "connection",
        ErroMsg: undefined,
        SuccMsg: undefined
    })

    return (
            <ApiRequestContext.Provider value={{state, setState}}>
                {children}
            </ApiRequestContext.Provider>
    );
}

export default ApiRequestContextProvider;