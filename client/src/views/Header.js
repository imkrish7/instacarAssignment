import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Style from '../sass/header.module.scss';
class Header extends Component{

	constructor(props){
		super(props);
		this.state = {
			open: false
		}
	}

	expand = () =>{
		this.setState({
			open: !this.state.open
		})
	}
	render(){
		return <div className={Style.container}>
				<div className={Style.logo}>Url Shortener</div>
				<div className={Style.hamburger} onClick={ this.expand } >
					<div className={Style.line}></div>
				</div>
				<nav className={[this.state.open ? Style.open : "", Style.navbar].join(' ')}>
					<ul className={Style.list}>
						<NavLink activeClassName={Style.active} className={Style.link} to="/home">
							<li className={Style.list_item}>Home</li>
						</NavLink>
						<NavLink activeClassName={Style.active} className={Style.link} to="/url_list">
							<li className={Style.list_item}>Url List</li>
						</NavLink>
					</ul>
				</nav>
			</div>;
	}
}

export default Header