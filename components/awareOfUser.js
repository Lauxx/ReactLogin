var React = require('react');
var LogoutUser = require('./userLogout.js');
var UserLoginData = require('./userLoginData.js');
var UserSignupData = require('./userSignupData.js');



var AwareOfUser = React.createClass({
	render: function(){
		if(this.props.user.user !== "anonymous"){
			return (
			<div>
				<LogoutUser logoutUser={ this.props.logoutUser } />
				<h2> Hello { this.props.user.user.username } </h2>

			</div>
			)
		} else {
			return (
				<div className="container">
				<h3> Welcome Please sign in </h3>
				<UserLoginData loginUserFromServer={ this.props.loginUserFromServer } />
				<UserSignupData signupUserFromServer={ this.props.signupUserFromServer }/>
				</div>
				)
		}
	}
});

module.exports = AwareOfUser;