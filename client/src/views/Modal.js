import React, { Component } from 'react';
import Style from '../sass/modal.module.scss'
class Modal extends Component{

	constructor(props){
		super(props);
		this.state = {
			hide: false
		}
	}

	handleClick = ()=>{
		this.setState({
			hide: true
		})
	}

	render(){
		return <div className={this.props.isOpen?  Style.modal : Style.hide}>
				<div className={Style.body}>
					{this.props.children}
					<div className={Style.cancelBtn}>
						<button onClick={this.props.toggle} className={Style.btn}>Cancel</button>
					</div>
				</div>
			</div>;
	}
}

export default Modal;