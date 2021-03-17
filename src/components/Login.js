import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Button from '@material-ui/core/Button';
import { TypingDNA } from './utils/typingdna'

import { login } from './actions/actions';

class Login extends React.Component {
  state = {
    error:'',
    username: '',
    password: '',
    email: '',
    emailTp : null,
    passwordTp:null,
    numOfAttemptsData:""
  }


  email=React.createRef();
  password=React.createRef();
  tdna = {}
  componentDidMount() {
    this.emailPattern = new TypingDNA()
    this.passwordPattern = new TypingDNA()

    axios.get("https://typingdna-api.herokuapp.com/api/v1/attempts/")
    .then(res =>{
      this.setState({...this.state, numOfAttemptsData:res.data.responseMessage})
    }).catch(err => {
      this.setState({...this.state,numOfAttemptsData:err})
    })
  }

  handleChanges = (e) => {
    e.preventDefault();

    const emTp = this.emailPattern.getTypingPattern({type: 0, length: this.state.email.length.toString()})
    const passwordPattern = this.passwordPattern.getTypingPattern({type:0,length: this.state.password.length.toString()})

    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      emailTp:emTp,
      passwordTp: passwordPattern
    });
    console.log(this.state)
  };

  login = (e) => {
    e.preventDefault();
    if(this.state.email==='typelikenotyou@fakemail.com'){
      const pattern={emailPattern: this.state.emailTp,passwordPattern:this.state.passwordTp}
      axios
      .put('https://typingdna-api.herokuapp.com/api/v1/attempts/', pattern)
      .then(res => {
        console.log(res)
        this.setState({
          ...this.state,
          numOfAttemptsData: res.data.responseMessage
        })
      }).catch(err =>{
        console.log(err)
        this.setState({
          ...this.state,
          error:err.err.message
        })
      })
    }else{
      this.setState({
        ...this.state,
        error:"Please enter in the right username and password"
      })
    }
  };
  render() {
    console.log(this.state.numOfAttemptsData[0])

    return (
      <div className='login-wrapper'>
        <div className='form'>
          <div className='explainer'>
            <h1>
              Can you type like <span>someone else?</span>
            </h1>
            <p>
              Typing biometrics analyzes the way you type to figure out if
              you're, y'know, you! Companies like TypingDNA use typing
              biometrics for things like multi-factor authentication and fraud
              prevention.
            </p>
            <p>
              So... does it actually work? How hard is it to type like someone
              else? Let's test it! Can you "login" using our friend's email and
              password? We recorded her typing them for you! All you have to do
              is type like her.
            </p>
          </div>
          {/* <img src='https://i.imgur.com/W7d92CG.png' alt='Logo' /> */}
          <div>
            <FormControl>
              <div className='space'>
                <p>{this.state.error}</p>
                <TextField
                  className={
                    this.props.error === true
                      ? 'error login-input'
                      : 'login-input'
                  }
                  id='outlined-helperText'
                  label='email'
                  helperText='Email has to be typelikenotyou@fakemail.com'
                  variant='outlined'
                  onChange={this.handleChanges}
                  name='email'
                  value={this.state.email}
                  ref={this.email}
                />
              </div>
              <div className='space'>
                <TextField
                  className={
                    this.props.error === true
                      ? 'error login-input'
                      : 'login-input'
                  }
                  id='outlined-helperText'
                  label='password'
                  helperText='Password has to be hackthep@tt3rn'
                  variant='outlined'
                  onChange={this.handleChanges}
                  name='password'
                  value={this.state.password}
                  ref={this.password}
                />
              </div>

            </FormControl>
          </div>
          <button onClick={this.login}>login</button>
          {this.state.numOfAttemptsData[0] ? <p>There have been {this.state.numOfAttemptsData[0].numOfAttempts} attempts</p> : <p></p>}
          {this.state.numOfAttemptsData[0] ? <p>and only {this.state.numOfAttemptsData[0].numOfSuccessfulAttempts} have succeeded</p> : <p></p>}
        </div>
        {/* <div className='login-splash' /> */}
      </div>
    );
  }

}

const mapStateToProps = ({ token, loggingIn, error }) => ({
  token,
  loggingIn,
  error,
});

export default connect(mapStateToProps, { login })(Login);