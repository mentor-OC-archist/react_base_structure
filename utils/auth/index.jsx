import React, {useState, useEffect, createContext} from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    , [user, setUser] = useState({})
    , [datas, setDatas] = useState(false) 
	, [pathname, setPathname] = useState(document.location.pathname)

    useEffect(() => {
        if(token)
            fetch('http://localhost:3000/api/sauces', {
                method: "GET"
                , mode: "cors"
                , headers:{
                    "Content-type": "application/json"
                    , "Authorization": "Bearer "+token
                }
            })
                .then((res) => {
                    return res.json()
                })
                .then(contents => {
                    console.log(contents);
                    setDatas(contents)
                })
	}, [token])

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, datas, setDatas , pathname, setPathname}}>
            {children}
        </AuthContext.Provider>
    )
}
