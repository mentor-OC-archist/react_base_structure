import React, {useState, useEffect, createContext} from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    , [user, setUser] = useState({})
    , [datas, setDatas] = useState(false) 

    useEffect(() => {fetch('http://localhost:3000/api/data')
        .then((res) => {
            return res.json()
        })
        .then(contents => {
            console.log(contents);
            setDatas(contents)
        })
	}, [])

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, datas, setDatas }}>
            {children}
        </AuthContext.Provider>
    )
}
