import { useContext, useState } from 'react'
import { AuthContext } from '../utils/auth'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SectionStyled = styled.section`
`



export default function Header() {
    let { setToken, token, user} = useContext(AuthContext)
	let [Content, setContent] = useState()
	
    // let paramURL = useParams().paramURL || 1
	// , [hook,setHook] = useState()
	// , { setToken, token } = useContext(AuthContext)
    // useEffect(() => {
	// }, [])
	
	return <header clasName="header">
			Je suis la page d'accueil

            <SectionStyled className="header__secondaryMenu">
                {!token && <>
                    <Link to="/login" path="login">Login</Link>
                    <Link to="/signup" path="signup">Signup</Link>
                </>}
                {token &&
                    <Link to="/logout" path="logout">Logout</Link>
                }
                {token && user.role=="2" &&
                    <Link to="/menu/new">+</Link>
                }
            </SectionStyled>
	</header>
}
