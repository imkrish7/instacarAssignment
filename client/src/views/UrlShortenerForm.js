import React, { Component } from 'react';
import Modal from './Modal';
import { createLongUrl } from '../actions/userActions';
import { connect } from 'react-redux';
import Style from '../sass/urlshortenerform.module.scss';
class UrlShortenerForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			error: false,
			longUrl: '',
			customUrl: '',
			modal: false,
		}
	}

	handleChange = (e)=>{
		
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	closeModal = () => {
		this.setState({
			modal: false
		})
	}

	handleSubmit = () => {
		if(this.state.longUrl.length > 0){
			const params = {
				longUrl: this.state.longUrl,
				customUrl: this.state.customUrl
			}
			this.setState({
				modal: true
			})
			this.props.createLongUrl(params);
		}else{
			this.setState({
				error: true
			})
		}
	}

	render(){
		return <div className={Style.container}>
				<div className={Style.header}>Enter url</div>
				<div className={Style.form}>
					<div className={Style.inputWrapper}>
						<input required value={this.state.longUrl} onChange={this.handleChange} name="longUrl" className={Style.input} />
						<label className={Style.label}>
							<span className={Style.content}>Long Url</span>
						</label>
					</div>
					<div className={Style.inputWrapper}>
						<input required value={this.state.customUrl} onChange={this.handleChange} name="customUrl" className={Style.input} />
						<label className={Style.label}>
							<span className={Style.content}>Custome Url</span>
						</label>
					</div>
					<div className={Style.btnWrapper}>
						<button type="submit" className={Style.btn} onClick={this.handleSubmit}>
							Submit
						</button>
					</div>
				</div>
				{this.props.createLongUrlResponse.data && this.props.createLongUrlResponse.data.success && <Modal toggle={this.closeModal} isOpen={this.state.modal}>
						{' '}<p className={Style.success}>Success</p>{' '}
					</Modal>}
				{this.props.createLongUrlResponse.error && this.props.createLongUrlResponse.error.data && <Modal toggle={this.closeModal} isOpen={this.state.modal}>
						{' '}<p className={Style.fail}>
							{this.props.createLongUrlResponse.error &&
								this.props.createLongUrlResponse.error.data &&
								this.props.createLongUrlResponse.error.data.data.msg}
						</p>{' '}
					</Modal>}
			</div>;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createLongUrl: params => dispatch(createLongUrl(params))
	}
}

const mapStateToProps = state => {
	return{
		createLongUrlResponse: state.createLongUrlResponse
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlShortenerForm);