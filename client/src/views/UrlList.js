import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLongUrl } from '../actions/userActions';
import Style from '../sass/urllist.module.scss';
class UrlList extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getLongUrl({});
	}

	render(){
		return <div className={Style.container}>
			<div className={Style.header}>URL List</div>
				{this.props.getLongUrlResponse.data && this.props.getLongUrlResponse.data.success ? 
				<ul className={Style.list}>
				{this.props.getLongUrlResponse.data.data.map((data, ind)=>{
					return <li key={ind} className={Style.list_item}>
							<div className={Style.subHeader}>Long_URL: {data.longUrl}</div>
							<a href={data.longUrl}>
							 Short_URL:	{data.shortUrl}
							</a>
						</li>;
				})}	
				</ul>
			: <p>No List is available </p>}
			</div>;
	}
}

const mapDispatchToProps = dispatch => {
	return{
		getLongUrl: params=> dispatch(getLongUrl(params))
	}
}

const mapStateToProps = state => {
	return {
		getLongUrlResponse: state.getLongUrlResponse
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(UrlList);