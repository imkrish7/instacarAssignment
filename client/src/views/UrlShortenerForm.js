import React, { Component } from 'react';
import axios from 'axios';
import Style from '../sass/urlshortenerform.module.scss';
class UrlShortenerForm extends Component{

	constructor(props){
		super(props);
		this.state = {

		}
	}

	componentDidMount(){
		const url = 'http://localhost:5000/api/add'
		axios.get(url).then(res=>{
			console.log(res);
		}).catch(error =>{
			console.log(error);
		})
	}

	handleChange = (e)=>{
		
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	render(){
		return <div className={Style.container}>
				<div className={Style.header}>Enter url</div>
				<div className={Style.form}>
					<input required value={this.state.longUrl} onChange={this.handleChange} name="longUrl" className={Style.input} placeholder={'Enter your long url'} />
					<input value={this.state.customUrl} onChange={this.handleChange} name="customUrl" className={Style.input} placeholder="Enter custom url (optional)" />
					<div className={Style.btnWrapper}>
						<button type="submit" className={Style.btn}>
							Submit
						</button>
					</div>
				</div>
			</div>;
	}
}

export default UrlShortenerForm;