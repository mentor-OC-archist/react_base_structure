
import {useEffect, useState, useContext} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AuthContext } from '../../utils/auth'

function Home() {

	let [Contents, setContents] = useState([])
	, {token, datas, user, setUser, setDatas, setPathname} = useContext(AuthContext)
    , navigate = useNavigate()
	, generateOutput = (contents) => {
		let { template } = contents || {}
		, contents_tmp = []
		console.log(contents)

		// contents_tmp.push(<Template data={template} bem="template" />)
		setContents(contents_tmp = <span>okok span</span>)
	}
	
	
    useEffect(() => {
		console.log(token)
		console.log(!token)
		console.log(user)
        console.log("1,2, teste, test, 1,2, test")
	    // if(!token)navigate('/login')
		// else generateOutput(datas.home)
        setPathname(document.location.pathname)
	    if(!token)navigate('/login')
			generateOutput(datas)
	}, [datas, token])

	
	const H2Styled = styled.h2`
		text-align: center;
		margin: 2em auto;
		font-size:1rem;
	}
	`
	const UlStyled = styled.ul`
	    display: flex;
		justify-content:center;
		>li>a{
			text-align: center;
			width: 220px;
			transition: all 0.1s ease-in-out;
			cursor: pointer;
			>img{    max-width: 200px;max-height: 250px;	}
			>h4{	    margin: 0;font-weight: 500;	}
			>p{	    margin:0;	}
		}
	`
	
	return <>
		{Contents}
		<H2Styled>THE SAUCES</H2Styled>
		<UlStyled className="listSauce">
			{datas && datas.map(
				sauce => <li className="listSauce__item">
					{console.log(sauce._id)}
					<Link to={"/sauce/"+sauce._id}>
						<img src={sauce.imageUrl} alt="" />
						<h4>{sauce.name}</h4>
						<p>Heat: {sauce.heat}/10</p>
					</Link>
				</li>
			)}
		</UlStyled>
	</>
}
export default Home


