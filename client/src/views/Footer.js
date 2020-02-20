import React,  { Component } from 'react';
import Style from '../sass/footer.module.scss';
class Footer extends Component{

	render(){
		return <div className={Style.container}>
				<span>Copyright &copy; 2020</span>
			</div>;
	}
}

export default Footer;