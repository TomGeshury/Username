import React, { Component } from 'react';
import 'whatwg-fetch';
// import Comments from './components/Comments.js'
// import Signup from './components/Signup.js'
// import Login from './components/Login.js'
import dummydata from './dummydata.js'
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      users: [],
      loggedIn: false,
      loginFormState: 'signup',
      loginFailed: false,      
      commentFormText: '',
      loginFormTextUsername: '',
      loginFormTextPassword: '',
      error: null,
    };
    this.pollInterval = null;
    // this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this)
    // this.loadUsersFromServer = this.loadUsersFromServer.bind(this)
    this.renderComments = this.renderComments.bind(this)
    this.renderCommentForm = this.renderCommentForm.bind(this)
    this.renderLoginForm = this.renderLoginForm.bind(this)
    this.setLoggedIn = this.setLoggedIn.bind(this)
    // this.setLoginFormState = this.setLoginFormState.bind(this)
    this.handleFormTextChange = this.handleFormTextChange.bind(this)
    this.submitComment = this.submitComment.bind(this)
    this.submitLoginAttempt = this.submitLoginAttempt.bind(this)

  }

  componentDidMount() {
    this.loadFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  // loadCommentsFromServer = () => {
  //   // fetch returns a promise. If you are not familiar with promises, see
  //   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  //   fetch('/api/comments/')
  //     .then(data => data.json())
  //     .then((res) => {
  //       if (!res.success) this.setState({ error: res.error });
  //       else this.setState({ data: res.data });
  //     });
  // }

  loadFromServer = () => {
    // this.loadCommentsFromServer()
    // this.loadUsersFromServer()
    this.setState({
      comments: dummydata.comments,
      users: dummydata.users
    })
  }

  // submitHelloWorld = (e) => {
  //   e.preventDefault();
  //   fetch('/api/comments', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({text: 'Hello World!'}),
  //   }).then(res => res.json()).then((res) => {
  //     if (!res.success) this.setState({ error: res.error.message || res.error });
  //     else this.setState({error: null });
  //   });
  // }

  // listHelloWorlds = () => {
  //   console.log(this.state.data)
  //   let map1 = this.state.data.map((x) => (
  //   <li key={x._id}>{x.text} {x._id}</li>
  //   ))
  //   return map1
  // }

  renderComments() {
    let ret = this.state.comments.map((x, i) => (
      <li key={i}>{x.text}</li>
    ))
    return ret
  }

  setLoggedIn(bool) {
    this.setState({loggedIn: bool})
  }

  handleFormTextChange(e, formText) {

    this.setState({ [formText] : e.target.value});
    e.preventDefault()
  }

  submitComment(e) {
    const newComment = {text: this.state.commentFormText}
    let comments = this.state.comments.slice().concat(newComment);
    this.setState({
      commentFormText: '',
      comments: comments
    })
    e.preventDefault()
  }

  submitLoginAttempt(e) {
    
    const users = this.state.users
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === this.state.loginFormTextUsername && users[i].passwordHash === this.state.loginFormTextPassword) {
        this.setLoggedIn(true)
        this.setState({
          loginFormTextUsername: '',
          loginFormTextPassword: ''
          })
        return
      } 
    }
    this.setState({
      loginFailed: true,
      loginFormTextUsername: '',
      loginFormTextPassword: ''
    })
    e.preventDefault()
  }

  renderLoginForm() {
    console.log(this.state.loginFormState)
    if (this.state.loginFormState === 'login') {
      const usernameText = this.state.loginFormTextUsername
      const passwordText = this.state.loginFormTextPassword
      return (
        
        <div>
          <form onSubmit={this.submitLoginAttempt}>
          <input
          type="text"
          name="loginUsernameForm"
          placeholder="Username"
          value={usernameText}
          onChange={e => this.handleFormTextChange(e, 'loginFormTextUsername')}
          />  
          <input
          type="text"
          name="loginPasswordForm"
          placeholder="Password"
          value={passwordText}
          onChange={e => this.handleFormTextChange(e, 'loginFormTextPassword')}
          />  
          <button type="submit">Submit</button>
          </form>
          {this.state.loginFailed ? (<div>Wrong Username and/or Password</div>): (null)}
          
        </div>

      )
    } else if (this.state.loginFormState === 'signup') {
        return (<div>Signup form to be built...</div>)
    }
    return null
  }

  renderCommentForm() {
    return (
    <form onSubmit={this.submitComment}>
    <input
      type="text"
      name="commentForm"
      placeholder="Say something..."
      value={this.state.commentFormText}
      onChange={e => this.handleFormTextChange(e, 'commentFormText')}
    />
    <button type="submit">Submit</button>
    </form>)
 }
  // render() {
  //   return (
  //     <div className="container">
  //       <div className="list">
  //         <h2>Comments:</h2>
  //         {this.listHelloWorlds()}
  //       </div>
  //       <div className="button">
  //         <button onClick={(e) => this.submitHelloWorld(e)} > BUTTON </button>
  //       </div>
  //       {this.state.error && <p>{this.state.error}</p>}
  //     </div>
  //   );
  // }

  render() {
    
    // let loginProps = {}
    // let signupProps = {}
    // let commentsProps = {className: 'comments', comments: this.state.data.comments}
    return (
      <div className="container">
        {this.state.loggedIn ? (
          <button className ="logout" onClick={() => this.setLoggedIn(false)}>LOG OUT</button>
        ) : (
          <div>
            <button className ="login" onClick={() => this.setState({loginFormState:'login'})}>LOG IN</button>
            <button className ="signup">SIGN UP</button>  
            {this.renderLoginForm()}
          </div>
          
        )}
        {this.renderComments()}
        {this.state.loggedIn ? (this.renderCommentForm()) : (null)}
      </div>
    )
  }

}

export default App;