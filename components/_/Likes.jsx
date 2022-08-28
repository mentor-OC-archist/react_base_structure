import {useEffect, useState, useContext} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AuthContext } from '../../utils/auth'


const GetLikeFunctionnality = (datas) => {

    return <button className="likes">
        <i className="fas fa-heart">
            {datas.usersLiked.find(id=>id==datas.userId)&&<i className="fas fa-heart"></i>}
        </i>
        <span>{datas.likes}</span>
    </button>
}


export default function Post({datas=[]}) {
    
    const [Data, setData] = useState([])

    useEffect(() => {
        console.log(datas);
        if(datas)setData(GetLikeFunctionnality(datas))
    }, [])
    
    
    return (<>
        {Data}
    </>)
}
