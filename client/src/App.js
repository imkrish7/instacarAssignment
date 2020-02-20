import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './views/Header';
import Footer from './views/Footer';
import UrlShortenerForm from './views/UrlShortenerForm';
import './App.css';

function App() {
	return <Router>
			<div className="App">
				<Header />
				<main>
					<Switch>
						<Route exact path="/home" component={UrlShortenerForm} />
						<Route exact path="/url_list"  />
					</Switch>
				</main>
			</div>
			<Footer />
		</Router>;
}

export default App;
