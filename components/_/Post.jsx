import {useEffect, useState, useContext} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AuthContext } from '../../utils/auth'

import Like from './Likes.jsx'


const GetPostsList = (datas) => { 

    const arr = []

    return datas.map((post) => {
        console.log(post._id);
        return <li className="post__card" key={post._id}>
            <Link to={"post/"+post.titre.replace(' ','-')+"-"+post._id}>
                <img src={"/"+post.imageUrl} alt={post.titre} />
                <p>created: {post.creationDate}</p>
                <section>
                    <h3>{post.titre}</h3>
                    <p>{post?.contenu.substring(0,100)}...</p>
                    <Like datas={post} />
                </section>
            </Link>
        </li>
    })
    
    // return arr
}

export default function Post({datas=[]}) {
    
    const [Data, setData] = useState([])

    useEffect(() => {
        console.log(datas);
        if(datas)setData(GetPostsList(datas))
    }, [])
    
    
    console.log(Data);
    return (
        <ul className="post">
            {Data.map(e=>e)}
        </ul>
    )
}
