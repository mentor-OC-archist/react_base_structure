
import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components'
import './assets/scss/index.scss';
import Login from './pages/Login';
import Home from './pages/Home';
import Sauce from './pages/Sauce';
import NewSauce from './pages/NewSauce';
import Header from './components/Header'
// import Nav from './components/Nav'
// import Aside from './components/Aside'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './utils/auth'
//import reportWebVitals from './reportWebVitals';

const MainStyled = styled.main`

`

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
		    <Header />
		    {/* <Nav /> */}
			<MainStyled>
				<Routes>
					<Route path="/sauces" element={<Home />}></Route>
					<Route path="/login" element={<Login path="login" />}></Route>
					<Route path="/login/:back" element={<Login path="login" />}></Route>
					<Route path="/signup" element={<Login path="signup" />}></Route>
					<Route path="/signup/:back" element={<Login path="signup" />}></Route>
					<Route path="/logout" element={<Login path="logout" />}></Route>
					<Route path="/new-sauce" element={<NewSauce />}></Route>
					<Route path="/new-sauce/:id" element={<NewSauce />}></Route>
					<Route path="/sauce/:id" element={<Sauce />}></Route>
					<Route path="*" element={<Navigate replace to="/login" />}></Route>
				</Routes>
			</MainStyled>
		    {/* <Aside /> */}
		    <Footer />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);


