
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/index.scss';
import Home from './pages/Home';
import Header from './components/Header'
import Nav from './components/Nav'
import Aside from './components/Aside'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
		    <Header />
		    <Nav />
		    <main>
		    <Routes>
				<Route path="/" element={<Home />}></Route>
			</Routes>
		    </main>
		    <Aside />
		    <Footer />
		</BrowserRouter>
	</React.StrictMode>
);


