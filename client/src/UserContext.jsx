/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const UserContext = createContext()

export function UserContextProvider({ children }){

    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if(!user) {
            axios.get('http://18.144.53.6:1234/api/profile', { withCredentials: true })
            .then(({data}) => {
                setUser(data)
                setReady(true)
            })
        }
    }, [user])

    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}