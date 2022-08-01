import { useContext } from 'react'
import { AuthContext } from '../utils/auth'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'


export default function Header() {
    let { setToken, token } = useContext(AuthContext)
    return (
        <header>
            header

            {/*DÉPOSER CI-DESSOUS DU HTML CORRESPONDANT À DU CONTENU STATIQUE(MENU PRIMAIRE SECONDAIRE, LOGO ET ETC)*/}
            {/*DÉPOSER CI-DESSOUS DES ABBRÉVIATIONS  SNIPPETS POUR GÉNÉRER DES MENU DYNAMIQUE (ET STATIQUE)*/}
            {/**/}
        </header>
    )
}
