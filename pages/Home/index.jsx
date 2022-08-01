
import {useEffect, useState, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../utils/auth'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Home() {
	
    // let paramURL = useParams().paramURL || 1
	// , [hook,setHook] = useState()
	// , { setToken, token } = useContext(AuthContext)
    // useEffect(() => {
	// }, [])
	
	return <>
			Je suis la page d'accueil
	</>
}
export default Home


