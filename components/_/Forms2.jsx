import {useEffect, useState, useContext} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AuthContext } from '../../utils/auth'


const handleSubmit = (e) => {
    e.preventDefault()
    // alert(document.forms[0].dataset.method)
    let body = Array.from(new FormData(document.forms[0])).map(item=>({[item[0]]: item[1]}))
    console.log("sunbmit");
    console.log(document.forms[0]);
    console.log(body)
    body = JSON.stringify(body)
    fetch("http://localhost:3000/post",{
        method: document.forms[0].dataset.method
        , headers:{"Content-type":"application/json"}
        , body
    })
}
, instance2type = {String: 'text', Number: 'number'}
, GetFieldsets = (datas, excludes) => { 
    
    const arr = []
    , doRequire = false
    for(let a in datas)if(a!="_id"&&a!="__v"){
        if(!excludes.includes(a))
            arr.push(<fieldset key={a}>
                <label htmlFor={a}>{a}</label>
                <input 
                    name={a} 
                    id={a}
                    placeholder="" 
                    defaultValue={datas[a].defaultValue?datas[a].defaultValue:""} 
                    required={doRequire&&datas[a].isRequired?true:false}
                    type={instance2type[datas[a].instance]}
                />
            </fieldset>)
    }

    return arr
 }

export default function Forms({datas=false, method = "POST", excluded}) {
    
    const [Data, setData] = useState(datas)


    useEffect(() => {
        console.log("ok");
        console.log(datas);
        if(!datas)
            fetch("http://localhost:3000/post")
                .then((res)=>res.json())
                .then((json) => {
                    console.log(json);
                    setData(GetFieldsets(json, excluded))
                },[Data])
        else setData(GetFieldsets(datas.modelsSchema, excluded))
    }, [])
    
    
    return (
        <form onSubmit={handleSubmit} data-method={method}>
            {/* <input type="hidden" defaultValue={method} /> */}
            {Data}
            <input type="submit" />
        </form>
    )
}
