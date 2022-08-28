import { useContext, useState } from 'react'
import { AuthContext } from '../utils/auth'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SectionStyled = styled.section`
`
const SectionLogoStyled = styled.section`
    display: flex;
    align-items:center;
    >img{height:5em;}
    >hgroup{
        text-align:center;
        >h1{font-size:2.5em;margin:0;}
        >h2{font-size:1.5em;margin:.5em 0 0;}
    }
`
const menuStyled = styled.menu`
    display:flex;
`




export default function Header() {
    let { setToken, token, user} = useContext(AuthContext)
	let [Content, setContent] = useState()
	
    // let paramURL = useParams().paramURL || 1
	// , [hook,setHook] = useState()
	// , { setToken, token } = useContext(AuthContext)
    // useEffect(() => {
	// }, [])
	
	return <header className="header">
        <menu className="header__mainMenu">
            <li><Link to="/">Accueil</Link></li>
        </menu>
        <SectionLogoStyled className="header__logo">
            <Link to="/">
                <img src="/logo192.png" alt="" />
                {/* <img src={process.env.PUBLIC_URL +"/logo912.png"} alt="" /> */}
                <span>Je suis la page d'accueil</span>
                
            </Link>
        </SectionLogoStyled>

        <SectionStyled className="header__logins">
            {!token && <>
                <Link to="/login" path="login">Login</Link>
                <Link to="/signup" path="signup">Signup</Link>
            </>}
            {token && user.role=="2" &&
                <Link to="/menu/new">+</Link>
            }
            {token &&
                <Link to="/logout" path="logout">Logout</Link>
            }
        </SectionStyled>
	</header>
}
