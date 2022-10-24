import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {

    const { register, login, authenticated, logout } = useAuth();

    return (
        <Context.Provider value={{ register, login, authenticated, logout }}>
            { children }
        </Context.Provider>
    )

}

export { Context, UserProvider };