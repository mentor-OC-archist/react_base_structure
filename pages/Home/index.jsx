
import {useEffect, useState, useContext} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AuthContext } from '../../utils/auth'

function Home() {

	let [Contents, setContents] = useState([])
	, {token, datas, user, setUser, setDatas} = useContext(AuthContext)
    , navigate = useNavigate()
	, generateOutput = (contents) => {
		let { template } = contents
		, contents_tmp = []
		console.log(contents)

		// contents_tmp.push(<Template data={template} bem="template" />)
		setContents(contents_tmp = <span>okok span</span>)
	}
	
	
    useEffect(() => {
		console.log(token)
        console.log("1,2, teste, test, 1,2, test")
	    if(!token)navigate('/login/menu')
		else generateOutput(datas.home)
	}, [datas])

	

	
	return <>
		{Contents}
	</>
}
export default Home


