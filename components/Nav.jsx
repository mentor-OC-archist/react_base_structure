import { Link } from 'react-router-dom'
import styled from 'styled-components'


const UlHomeStyled = styled.ul`

  display:flex;
  gap:1em;
  &>li{
    position:relative;
    &:first-of-type:before{
      font-family: 'Font Awesome 6 Free';
      content:"\\e1b0";
      font-weight:900;
    }
    &:not(:first-of-type):after{
      content:">";
      position:absolute;
      left:-.75em;
    }
  }
`


export default function Nav() {
  return (
    <nav className="filAriane">
        <UlHomeStyled className="filAriane__list">
          <li>Accueil</li>
          <li>autre</li>
        </UlHomeStyled>
    </nav>
  )
}
