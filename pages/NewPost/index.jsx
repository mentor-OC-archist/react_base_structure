import { useContext, useParams, useState } from 'react'
import { AuthContext } from '../../utils/auth'
import { Link, Navigate, useNavigate } from "react-router-dom"
import styled from 'styled-components'

import Forms2 from '../../components/_/Forms2'


const FormStyled = styled.form`
`



export default function NewPost({method = "POST"}) {

    const [goSignin, setGoSignin] = useState(false)
    , pathBack = "" /*"/"+useParams()?.back || "/"*/
    , navigate = useNavigate()
    , {token, datas, setToken, user, setUser} = useContext(AuthContext)
    let doError = false

    /*
    console.log(path)
    if(token)navigate('/')
    if(path=="logout"){
        setToken(false)
        navigate("/")
    }
    */
    
    console.log(user);
    return (
        <Forms2 method={method} datas={datas.modelsSchema} excluded={["likes","dislikes","usersLiked","usersDisliked"]} />
    )
}
