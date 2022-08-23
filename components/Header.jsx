import { useContext, useState, useEffect } from 'react'
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



export default function Header() {
    let { setToken, token, user, pathname} = useContext(AuthContext)
	let [Content, setContent] = useState()
	
    // let paramURL = useParams().paramURL || 1
	// , [hook,setHook] = useState()
	// , { setToken, token } = useContext(AuthContext)
    // useEffect(() => {
	// })
	return <header className="header">
        <menu>
            {token && <>
                <li className={pathname==="/sauces" ? "active" : ""}><Link to={"sauces"}>ALL SAUCES</Link></li>
                <li className={pathname==="/new-sauce" ? "active" : ""}><Link to={"new-sauce"}>ADD SAUCE</Link></li>
            </>}
        </menu>

        <SectionLogoStyled>
            <img src="images/logo.png" alt="logo sauces piquantes" />
            <hgroup>
                <h1>HOT TAKES</h1>
                <h2>THE WEB'S BEST HOT SAUCE REVIEWS</h2>
            </hgroup>
        </SectionLogoStyled>

        <SectionStyled className="header__secondaryMenu">
            {!token && <>
                <Link to="/login" path="login">LOGIN</Link>
                <Link to="/signup" path="signup">SIGNIN</Link>
            </>}
            {token &&
                <Link to="/logout" path="logout">LOGOUT</Link>
            }
            {token && user.role=="2" &&
                <Link to="/menu/new">+</Link>
            }
        </SectionStyled>
	</header>
}
