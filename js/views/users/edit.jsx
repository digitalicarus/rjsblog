import React     from 'react';
import Reflux    from 'reflux';

import BasicInput   from 'appRoot/components/basicInput';
import Actions      from 'appRoot/actions/actions';
import SessionStore from 'appRoot/stores/sessionContext';
import UserStore    from 'appRoot/stores/users';

let emptyRegex = /^\s*$/;

/*
	a simple, albeit non-secure hash from string
*/
function getHashCode (str) {
	var hash = 0;
	if (str.length == 0) return hash;
	for (i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

export default React.createClass({
	mixins: [
		Reflux.connect(SessionStore, 'session'),
		Reflux.connect(UserStore, 'users')
	],
	editUser: function (e) {
		var detail = {}
		,   usernameEle = this.getInputEle('username')
		,   existing
		;

		e.preventDefault();

		Array.prototype.forEach.call(
			e.target.querySelectorAll('input'),
			function (v) {
				if(!emptyRegex.test(v.value)) {
					detail[v.getAttribute('name')] = v.value;
				}
			});

		existing = this.state.users.filter(function (v) { return v.username === detail.username; }).length > 0;

		if (this.state.profileImageData) {
			detail.profileImageData = this.state.profileImageData;
		}

		if (existing) {
			usernameEle.setCustomValidity('name taken');
		} else {
			usernameEle.setCustomValidity('');
			(this.loggedIn ? Actions.editUser : Actions.createUser)(detail);
		}

	},
	imageLoadedHandler: function (e) {
		var imageSize = atob(decodeURI(e.target.result).replace(/^.*base64,/,'')).length;

		this.setState({sizeExceeded: imageSize > 1024*1000});
		if (this.state.sizeExceeded /* || bad image */) {
			this.setPlaceholderImage();
		} else {
			this.setState({profileImageData: e.target.result});
		}
	},
	userImageUpload: function (e) {
		var file = e.target.files[0]
		,   reader = new FileReader()
		;

		reader.onload = this.imageLoadedHandler;
		reader.readAsDataURL(file);
	},
	getInputEle: function (ref) {
		return this.refs[ref] ? this.refs[ref].getDOMNode().querySelector('input') : undefined;
	},
	setPlaceholderImage: function (e) {
		var fileVal = this.getInputEle('profileImage');
		fileVal = fileVal ? fileVal.value : '';
		
		if (!typeof fileVal === 'string' || /^\s*$/.test(fileVal)) {
			this.setState({
				'profileImageData': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPCEtLSBDcmVhdGVkIHdpdGggTWV0aG9kIERyYXcgLSBodHRwOi8vZ2l0aHViLmNvbS9kdW9waXhlbC9NZXRob2QtRHJhdy8gLS0+CiA8Zz4KICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+CiAgPHJlY3QgZmlsbD0iIzAwZmZmZiIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjgyIiB3aWR0aD0iODIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPGVsbGlwc2Ugcnk9IjE1IiByeD0iMTUiIGlkPSJzdmdfMSIgY3k9IjMyLjUiIGN4PSI0MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmZmYiLz4KICA8ZWxsaXBzZSBzdHJva2U9IiMwMDAiIHJ5PSI2MS41IiByeD0iMzguNDk5OTk4IiBpZD0ic3ZnXzIiIGN5PSIxMTIiIGN4PSIzOS41IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNmZmYiLz4KIDwvZz4KPC9zdmc+'
			});
		}
	},
	componentWillMount: function () {
		this.setPlaceholderImage();
	},
	componentWillUpdate: function () {
		this.loggedIn = this.state.session.hasOwnProperty('userId');
	},
	chooseFile: function () {
		this.getInputEle('profileImage').click();
	},
	render: function () {
		var isnew = !this.loggedIn;

		return (
			<form className="user-edit" name="useredit" onSubmit={this.editUser}>
			<fieldset>
				<legend>{isnew ? 'become an ' : 'edit'} author</legend>

				<BasicInput 
					type="text"
					name="blogName" 
					placeholder="blog name" 
					autoFocus />
				<hr/>
				{ isnew && 
					<BasicInput 
						type="text" 
						ref ="username"
						name="username" 
						placeholder="username" 
						minLength="3"
						required /> 
				}
				{ isnew && 
					<BasicInput 
						type="password" 
						name="password" 
						minLength="6" 
						placeholder="password" 
						required /> 
				}
				{ isnew && <br/> }

				<div className="profile-image-container">
					<label>profile image</label>
					<img className="profile-img" src={this.state.profileImageData}/>
					<BasicInput name="profileImage" type="file" ref="profileImage" onChange={this.userImageUpload} helptext={this.state.sizeExceeded ? 'less than 1MB' : ''}>
						<button onClick={this.chooseFile}>choose file</button>
					</BasicInput>
				</div>

				<BasicInput type="text"  name="firstName" placeholder="first name" />
				<BasicInput type="text"  name="lastName"  placeholder="last name" />
				<BasicInput type="email" name="email"     placeholder="email" />
				<hr/>
				<BasicInput type="text"  name="twitter"  placeholder="twitter name" />
				<BasicInput type="url"   name="facebook" placeholder="facebook link" />
				
				<button type="submit">{ isnew ? "I'm ready to write" : "make changes" }</button>
			</fieldset>
			</form>
		); 
	}
});

