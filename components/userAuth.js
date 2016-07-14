//UserAuth
//	UserLoginData
//		UserLoginForm
//	UserSignupData
//		UserSignupForm
//  UserLogout



var React = require('react');
var ReactDOM = require('react-dom');
var Aware = require('./awareOfUser.js');


var UserAuth = React.createClass({
	getInitialState: function(){
		return {
			user: null
		}
	},


	loginUserFromServer: function(user){
		var self = this;
		$.ajax({
			method: 'POST',
			url: '/login',
			data: user,
			success: function(data){
				console.log("Login successful.", data);
				self.setState({ user: data });
			},
			error: function(xhr, status, err){
				console.error('/login', status, err.toString())
			}
		})
	},

	signupUserFromServer: function(user){
		var self = this;	
		$.ajax({
			method: 'POST',
			url: '/signup',
			data: user, 
			success: function(data){
				self.setState({ user: data})
				console.log("Signup successful.", data);
			},
			error: function(xhr, status, err){
				console.error('/signup', status, err.toString())
			}
		})

	},

	logoutUser: function(user){
		var self = this;
		$.ajax({
			url: '/logout',
			method: 'GET', 
			success: function(data){
				$.ajax({
					method: 'GET', 
					url: '/oneUser'
				}).done(function(data){
					console.log(data);
					self.setState({ user: data });
				})
			}.bind(self),
			error: function(xhr, status, err){
				console.error('/logout', status, err.toString());
			}
		})
		
	},

	getOneUserFromServer: function(){
		var self = this;
		$.ajax({
			method: 'GET', 
			url: '/oneUser'
		}).done(function(data){
			console.log(data);
			self.setState({ user: data });
		})
	},

	componentDidMount: function(){
		this.getOneUserFromServer();
	},



	render: function(){
			return this.state.user ? <Aware user={this.state.user} loginUserFromServer={this.loginUserFromServer} logoutUser={this.logoutUser} signupUserFromServer={this.signupUserFromServer}/> : null;
		}		
});

// module.exports = UserAuth;

ReactDOM.render(
	<UserAuth/>,
	document.getElementById('userAuth')
);