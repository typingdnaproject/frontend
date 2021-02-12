import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
// import { Form, Input } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
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
    username: '',
    password: '',
    email: '',
  }
  render() {
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
              {/* <Input
                id='input-with-icon-adornment'
                startAdornment={
                  <InputAdornment position='start'>
                    <EmailOutlinedIcon />
                  </InputAdornment>
                }
                className={
                  this.props.error === true
                    ? 'error login-input'
                    : 'login-input'
                }
              />
              <Input
                id='input-with-icon-adornment'
                startAdornment={
                  <InputAdornment position='start'>
                    <VisibilityOutlinedIcon />
                  </InputAdornment>
                }
                className={
                  this.props.error === true
                    ? 'error login-input'
                    : 'login-input'
                }
              /> */}
            </FormControl>
            {/* <Input
              placeholder='username'
              name='username'
              value={this.state.username}
              onChange={this.handleChanges}
              className={
                this.props.error === true ? 'error login-input' : 'login-input'
              }
              required
            />
            <i className='fas fa-user' />
          </div> */}
          </div>
          {/* <div>
          <Input
            type='password'
            placeholder='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChanges}
            className={
              this.props.error === true ? 'error login-input' : 'login-input'
            }
            required
          />
          <i className='fas fa-key' />
        </div> */}
          <Button variant='outlined' onClick={this.login}>login</Button>
          {/* <div>
            <div className='btn-login shd' onClick={this.login}>
              {this.props.loggingIn === true ? (
                <Loader
                  type='ThreeDots'
                  color='#fb553b'
                  height={80}
                  width={80}
                />
              ) : (
                <h3>GO</h3>
              )}
            </div>
            <i className='fas fa-sign-in-alt' />
          </div> */}
        </div>
        <div className='login-splash' />
      </div>
    );
  }
  email=React.createRef();
  password=React.createRef();
  tdna = {}

  componentDidMount() {
    this.tdna = new TypingDNA()
  }

  handleChanges = (e) => {
    e.preventDefault();
    // console.log("Check here", this.tdna)
    // console.log("HEEEEEEY",this.state)
    // console.log("EMaaaAIL",this.email.current)
    // const email = this.email.current;
    // const password = this.email.current;
    const tp = this.tdna.getTypingPattern({type: 1, length: 41, text: "typelikenotyou@fakemail.comhackthep@tt3rn"})
    console.log(this.tdna.getTypingPattern({type: 1, length: 41, text: "typelikenotyou@fakemail.comhackthep@tt3rn"}))
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      tp: tp
    });
    console.log(this.state)
  };

  login = () => {
    // this.state.email==='typelikenotyou@fakemail.com' && this.state.password==='hackthep@tt3rn'
    if(1==1){
      const pattern={tp: this.state.tp}
      axios
      // 'https://typingdna-api.herokuapp.com/api/v1/attempts/'
      .put('https://tdna.herokuapp.com/api/v1/attempts/', pattern)
      .then(res => {
        console.log("This is the response", res)
      })
    }
    // this.props.login({
    //   username: this.state.username,
    //   password: this.state.password,
    // });
  };
}

const mapStateToProps = ({ token, loggingIn, error }) => ({
  token,
  loggingIn,
  error,
});

export default connect(mapStateToProps, { login })(Login);