import { useContext, useParams, useEffect, useState } from 'react'
import { AuthContext } from '../../utils/auth'
import { Link, Navigate, useNavigate } from "react-router-dom"
import styled from 'styled-components'

const DivStyled = styled.div`
    display:flex;
    justify-content:center;
    >img{
        max-width: 600px;
        margin-right: 1em;
    }
    >.sauce-info{
        display: flex;
        flex-flow: column;
        gap: 10px;
        text-align: left;
        width: 30%;
        &>*{margin:0;}
        >.control-buttons{
            display:flex;gap:10px;
        }
    }
    .like-buttons{
        display:flex;
        >div{
            display: flex;
            gap: 10px;
            margin:0 10px;
        }
        i{
            font-family:"Font Awesome 5 Free";
            display: inline-block;
            font-style: normal;
            cursor:pointer;
            &.farlike{
                transform: scaleX(1) translateY(5px);
                &:hover{color:green;}
                &:before{content:"\f164";}
            }
            &.fardislike{
                transform: scaleX(-1) translateY(5px);
                &:hover:before{color:red;}
                :before{content:"\f165";
            }
        }
    }
`


export default function Sauce() {
	let [Contents, setContents] = useState([])
	, [sauce, setSauce] = useState({})
    , {token, setToken, user, setUser, datas} = useContext(AuthContext)
    , navigate = useNavigate()
	, generateOutput = (contents) => {
		let { template } = contents || {}
		, contents_tmp = []
		console.log(contents)

		// contents_tmp.push(<Template data={template} bem="template" />)
		setContents(contents_tmp = <span>okok span</span>)
	}
    , likedis = (e,likedis) => {
        alert(likedis)
        fetch("http://localhost:3000/api/sauces/"+document.location.pathname.split('/')[2]+"/like", {
            method: "post"
            , mode: "cors"
            , headers:{
                "Content-type": "application/json"
                , "Authorization": "Bearer "+token
            }
            , body: JSON.stringify({
                userId: user.id
                , like: likedis
            })
        }).then(res=>res.json())
        .then(json=>{
            console.log(json);
            alert("color:"+(likedis==1?"green":likedis==0?"black":"red"))
            e.target.style="color:"+(likedis==1?"green":likedis==0?"black":"red")
        })
    }
    , onBack = (e) => {
        navigate("/sauces")
    }
    , onModify = (e) => {
        navigate("/new-sauce/"+document.location.pathname.split('/')[2])
    }
    , onDelete = (e) => {
        fetch("http://localhost:3000/api/sauces/"+document.location.pathname.split('/')[2], {
            method: "delete"
            , mode: "cors"
            , headers:{
                "Content-type": "application/json"
                , "Authorization": "Bearer "+token
            }
        }).then(res=>res.json())
        .then(json=>{
            console.log(json);
            navigate("/sauces")
        })
    }
    
    useEffect(() => {
        setSauce(datas ? datas.find(x=>{
            console.log(x._id+" xxx "+document.location.pathname.split('/')[2]);
            return x._id == document.location.pathname.split('/')[2]
        }) : {})
        console.log(sauce);
	    if(!token)navigate('/login')
			generateOutput(datas.home)
	}, [datas, token, sauce])

    

    console.log(datas);
    console.log(sauce);
    console.log(user);
    
    return (
        <DivStyled className="sauce-container">
            <img src={sauce.imageUrl} alt={sauce.name} />
            <div className="sauce-info">
                <h1 className="sauce-name">{ sauce.name }</h1>
                <p className="manufacturer">by { sauce?.manufacturer }</p>
                <h3>Description</h3>
                <p>{ sauce.description }</p>
                <div className="like-buttons">
                    <div className="likes">
                        {sauce.like && console.log(sauce.liked)}
                        {sauce.like && console.log(sauce.usersLiked.find(user.id))}
                        {sauce.like && console.log(sauce.liked && sauce.usersLiked.find(user.id))}
                        {sauce.like && console.log(sauce.liked && sauce.usersLiked.find(user.id) ? 'fas liked': 'far')}
                        {sauce.like && alert('ok')}
                        {sauce.dislike && console.log(sauce.disliked && sauce.usersDisliked.find(user.id))}
                        {sauce.dislike && console.log(sauce.disliked && sauce.usersDisliked.find(user.id) ? 'fas liked': 'far')}
                        <i 
                            onClick={e=>{likedis(e,e.target.className.indexOf('liked')==-1?1:0)}} 
                            className={ (sauce.liked && sauce.usersLiked.find(user.id) ? 'fas liked': 'far') + (sauce.disliked ? 'disabled' : "") +  "like fa-thumbs-up fa-lg" }
                        ></i>
                        <span>{ sauce.likes }</span>
                    </div>
                    <div className="dislikes">
                        <i 
                            onClick={e=>{likedis(e,e.target.className.indexOf('disliked')==-1?-1:0)}} 
                            className={ (sauce.disliked && sauce.usersDisliked.find(user.id) ? 'fas disliked': 'far') + (sauce.liked ? 'disabled' : "") +  "dislike fa-thumbs-down fa-lg" }
                        ></i>
                        <span>{ sauce.dislikes }</span>
                    </div>
                </div>
                <div className="like-pending">
                </div>
                <div className="control-buttons">
                    <button id="back" onClick={e=>{onBack(e)}}>BACK</button>
                    {sauce.userId == user.id && <>
                        <button id="update" color="primary" onClick={e=>{onModify(e)}}>MODIFY</button>
                        <button id="delete" color="warn" onClick={e=>{onDelete(e)}}>DELETE</button>
                    </>}
                </div>
            </div>
        </DivStyled>
    )
}