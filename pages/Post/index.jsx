
import {useEffect, useState, useContext} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AuthContext } from '../../utils/auth'
import PagesComponents from '../../components/pagesComponents.js'

function Post() {

	let [Contents, setContents] = useState([])
	, {token, datas, user, setUser, setDatas} = useContext(AuthContext)
    , navigate = useNavigate()
	, generateOutput = (contents) => {
		let { titre, userId, imageUrl, contenu, creationDate } = contents || {}
		, contents_tmp = []
        contents_tmp.push(<>
            <h2>{titre}</h2>
            <p>{creationDate}</p>
            {/* <p>{new Date(creationDate)}</p> */}
            <img src={imageUrl} alt={titre} />
            <p>{contenu}</p>
        </>)
		console.log(contents)

		// contents_tmp.push(<Template data={template} bem="template" />)
		// setContents(contents_tmp = <span>okok span</span>)
		setContents(contents_tmp)
	}
	console.log("oioioui");
	
    useEffect(() => {
		console.log(datas)
	    if(token==false)navigate('/login')
		else generateOutput(datas.home)
        const post = datas?.modelsDatas?.post.find(e=>document.location.pathname.split('/')[2] == e.titre.replace(' ','-')+'-'+e._id)
		generateOutput(post)
	}, [datas])

	

	
	return <>
        <Link to="/">Retour</Link>
		{Contents}
	</>
}
export default Post


