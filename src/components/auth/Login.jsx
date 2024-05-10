import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { setUser } from '../../store/authSlice';
import checkGuest from './checkGuest';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('https://medicalstore.mashupstack.com/api/login', {
      email: email,
      password: password
    })
      .then((response) => {
        setErrorMsg('')
        var user = {
          name:"User",
          token: response.data.token
        }
        dispatch(setUser(user))
        navigate('/')
      }).catch(error => {
        if (error.response.data.errors) {
          setErrorMsg(Object.values(error.response.data.errors).join(' '));
        } else if (error.response.data.message) {
          setErrorMsg(error.response.data.message)
        } else {
          setErrorMsg('Failed to connect to api');
        }
      })
  }
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mt-3 text-center"><b>Login</b></h1>
          <hr />
          <form onSubmit={handleSubmit} className="bg-light p-3 rounded">
            {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ''}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail2" className="form-label"><b>Email</b></label>
              <input value={email} onInput={(e) => setEmail(e.target.value)} type="email" name="email" className="form-control" placeholder="Email" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label"><b>Password</b></label>
              <input value={password} onInput={(e) => setPassword(e.target.value)} type="password" name="password" className="form-control"
                placeholder="Password" />
            </div>
            <p><Link to={'/signup'}
              className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover"><b>Create
                new account?</b></Link></p>
            <button type="submit" className="btn btn-outline-dark"><b>Login</b></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default checkGuest(Login)
