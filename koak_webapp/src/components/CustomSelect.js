import React, { useContext } from "react"
import { ApiRequestContext } from "../context/ApiRequestContext";

export const CustomSelect = ({color, array, ar}) => {
    const {state, setState} = useContext(ApiRequestContext)
    console.log("context state: ", state)
    const handleOnChange = (e) => {
        setState((prev) => ({...prev, DisplayReactionService:true}))
        if (ar === "action")
            setState((prev) => ({...prev, ActionString:e.target.value}))
        else if (ar === "reaction")
            setState((prev) => ({...prev, ReactionString:e.target.value}))
    }
    return (
        <select className={`rounded-md border-2 ${color} space-x-2 bg-yellow-400 p-2 appearance-none hover:drop-shadow-xl hover:brightness-90`} onChange={handleOnChange}>
            {array.map((x, key) => <option key={key} value={x.value}>{x.label}</option>)}
        </select>
    )
}