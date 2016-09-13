if(!io)
	import io from 'socket.io-client'

var Message = React.createClass({
	render: function()
	{
		styles={}
		return (
				<div>	
				<img></img>
				<p>this.props.body</p>
				</div>
		       )
	}

});

var FBChat = React.createClass({
	getInitialState: function()
	{
		var localio = io();
	
		//login success function
		var fn = this.success;
		localio.on("success",function(){fn();});
	
		return {io:localio,messages:[],text:""};
	},
    	sendMessage: function(data)
	{
		this.state.io.emit("message",this.state.text);
		this.setState({messages:messages});	
	},
    	handleChange: function(event){
		this.setState({msg: event.target.value});
	},
    	login: function(){
		//Encryption here
		var jsonrep = {username:this.state.username,password:this.state.password};
		this.state.io.emit("login",jsonrep);
	},
	render: function()
	{
		if(this.state.logged){
			var messages = this.state.messages.map(function(message){
				return  (
					
					<Message body={message.body} sender={message.sender}></Message>
					
					);
		});
		//outline etc...
		//include messages, design, pics etc
		return  (
				<div>
				<input type="text" target="msg" placeholder="Start typing here" value={this.state.value} onChange={this.handleChange}/input>
				</div>
			);
		}
		return (
			<div>
			<input type="text" placeholder="Email Address" onChange={this.userChange}/>
			<input type="password" placeholder="Password" onChange={this.pwdChange} /> 	
			<button onClick={this.login}>login</button>
			</div>
		       )
	}
});

export default var FBChat;
