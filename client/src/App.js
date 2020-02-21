import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './views/Header';
import Footer from './views/Footer';
import UrlShortenerForm from './views/UrlShortenerForm';
import UrlList from './views/UrlList';
import './App.css';

function App() {
	return <Router>
			<div className="App">
				<Header />
				<main>
					<Switch>
						<Route exact path="/" component={UrlShortenerForm} />
						<Route exact path="/home" component={UrlShortenerForm} />
						<Route exact path="/url_list" component={UrlList} />
					</Switch>
				</main>
			</div>
			<Footer />
		</Router>;
}

export default App;
